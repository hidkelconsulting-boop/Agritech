import { Worker } from "bullmq";
import { createRedisConnection } from "./redis.js";
import { prisma } from "./db.js";
import { env } from "./env.js";
import { getPresignedUrl, isS3Configured } from "./storage.js";
import fs from "node:fs/promises";

// ─── Types ──────────────────────────────────────────────────────────────────

interface OpenAIVisionResponse {
  choices: Array<{ message: { content: string } }>;
}

interface AiFindings {
  anomaly_detected: boolean;
  severity: "none" | "low" | "medium" | "high" | "critical";
  summary: string;
  recommendations: string[];
  confidence: "low" | "medium" | "high";
}

function applyForcedSeverity(findings: AiFindings, forcedInput?: string): AiFindings {
  const forced = (forcedInput ?? env.aiTestForceSeverity).trim().toLowerCase();
  if (!forced) {
    return findings;
  }

  const allowed = new Set(["none", "low", "medium", "high", "critical"]);
  if (!allowed.has(forced)) {
    return findings;
  }

  const severity = forced as AiFindings["severity"];
  return {
    ...findings,
    severity,
    anomaly_detected: severity !== "none",
    summary: `[FORCED:${severity}] ${findings.summary}`,
  };
}

function toForcedFindings(forcedInput?: string): AiFindings | null {
  const forced = (forcedInput ?? env.aiTestForceSeverity).trim().toLowerCase();
  const allowed = new Set(["none", "low", "medium", "high", "critical"]);
  if (!forced || !allowed.has(forced)) {
    return null;
  }

  const severity = forced as AiFindings["severity"];
  return {
    anomaly_detected: severity !== "none",
    severity,
    summary: `[FORCED:${severity}] Résultat IA simulé pour test end-to-end.`,
    recommendations: [
      severity === "none"
        ? "Aucune action immédiate requise."
        : "Inspecter immédiatement la zone et appliquer le protocole d'urgence.",
    ],
    confidence: "high",
  };
}

// ─── OpenAI Vision analysis ─────────────────────────────────────────────────

async function analyzeImage(
  filePath: string,
  mimeType: string,
  context: string,
): Promise<AiFindings> {
  const apiKey = env.openAiApiKey;

  if (!apiKey) {
    // Heuristic fallback when OpenAI is not configured
    return {
      anomaly_detected: false,
      severity: "none",
      summary: "Analyse heuristique: aucune anomalie détectée (moteur IA non configuré).",
      recommendations: ["Continuer le protocole standard."],
      confidence: "low",
    };
  }

  let imageUrl: string;
  if (isS3Configured()) {
    imageUrl = await getPresignedUrl(filePath, 300);
  } else {
    const buffer = await fs.readFile(filePath);
    imageUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
  }

  const systemPrompt = [
    "Tu es un expert en agriculture (pisciculture, volaille, élevage d'insectes, arboriculture).",
    "Analyse cette photo d'exploitation agricole en contexte terrain Afrique centrale.",
    "Réponds UNIQUEMENT avec un JSON valide (sans markdown, sans bloc de code) avec exactement ces champs:",
    '{"anomaly_detected":boolean,"severity":"none"|"low"|"medium"|"high"|"critical",',
    '"summary":"string max 200 chars en français","recommendations":["string"],"confidence":"low"|"medium"|"high"}',
  ].join(" ");

  const userContent = context ? `Contexte: ${context}\n\nAnalyse cette image.` : "Analyse cette image agricole.";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: userContent },
            { type: "image_url", image_url: { url: imageUrl, detail: "low" } },
          ],
        },
      ],
      max_tokens: 350,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as OpenAIVisionResponse;
  const content = data.choices[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI response");
  return JSON.parse(content) as AiFindings;
}

// ─── Severity ranking for escalation ────────────────────────────────────────

const SEVERITY_RANK: Record<string, number> = {
  none: 0, low: 1, medium: 2, high: 3, critical: 4,
};

// ─── Worker ─────────────────────────────────────────────────────────────────

const connection = createRedisConnection();

if (!connection) {
  console.log("Worker disabled: REDIS_URL is not configured.");
  setInterval(() => {}, 60_000);
}

const worker = connection
  ? new Worker(
      "agritech-ai-analysis",
      async (job) => {
        const { mediaId, farmId, incidentId } = job.data as {
          mediaId: string;
          farmId: string;
          incidentId?: string;
          taskId?: string;
          forceAiSeverity?: string;
        };

        const media = await prisma.mediaAsset.findUnique({
          where: { id: mediaId },
          include: {
            task: { include: { zone: true } },
            incident: { include: { zone: true } },
          },
        });
        if (!media) return;

        // Build context from linked task / incident
        const contextParts: string[] = [];
        if (media.task) {
          contextParts.push(`Tâche: ${media.task.title}`);
          if (media.task.zone) contextParts.push(`Zone: ${media.task.zone.name} (${media.task.zone.zoneType})`);
        }
        if (media.incident) {
          contextParts.push(`Incident: ${media.incident.title} (sévérité: ${media.incident.severity})`);
          if (media.incident.description) contextParts.push(`Description: ${media.incident.description}`);
          if (media.incident.zone) contextParts.push(`Zone: ${media.incident.zone.name} (${media.incident.zone.zoneType})`);
        }

        const forcedFindings = toForcedFindings((job.data as { forceAiSeverity?: string }).forceAiSeverity);
        const findings = forcedFindings
          ? forcedFindings
          : applyForcedSeverity(
              await analyzeImage(media.filePath, media.mimeType, contextParts.join(" | ")),
              undefined,
            );

        // Persist AiAnalysis record
        const analysis = await prisma.aiAnalysis.create({
          data: {
            farmId,
            mediaAssetId: media.id,
            model: forcedFindings
              ? "agritech-forced-test"
              : env.openAiApiKey
                ? "gpt-4o-mini"
                : "agritech-heuristic-v1",
            status: "completed",
            summary: findings.summary,
            confidence: findings.confidence,
            rawJson: JSON.stringify(findings),
          },
        });

        await prisma.auditLog.create({
          data: {
            farmId,
            action: "ai.analysis.completed",
            resourceType: "media",
            resourceId: media.id,
            details: findings.summary,
          },
        });

        // ── Business rules ────────────────────────────────────────────────────
        if (findings.anomaly_detected && findings.severity !== "none") {
          // 1. Create alert
          await prisma.alert.create({
            data: {
              farmId,
              sourceType: "ai_analysis",
              sourceId: analysis.id,
              title:
                findings.severity === "critical"
                  ? "Anomalie critique détectée par IA"
                  : findings.severity === "high"
                    ? "Anomalie sévère détectée par IA"
                    : "Anomalie détectée par IA",
              message: findings.recommendations.length > 0
                ? `${findings.summary} — Recommandation: ${findings.recommendations[0]}`
                : findings.summary,
              severity: findings.severity,
            },
          });

          // 2. Auto-create remediation task for high/critical issues
          if (findings.severity === "critical" || findings.severity === "high") {
            const zoneId = media.task?.zoneId ?? media.incident?.zoneId ?? undefined;
            const autoTask = await prisma.task.create({
              data: {
                farmId,
                title: `[IA] Vérifier anomalie: ${findings.summary.slice(0, 80)}`,
                priority: findings.severity === "critical" ? "high" : "normal",
                status: "todo",
                zoneId,
              },
            });

            await prisma.auditLog.create({
              data: {
                farmId,
                action: "ai.task.auto_created",
                resourceType: "task",
                resourceId: autoTask.id,
                details: `Auto-créée par IA (sévérité: ${findings.severity})`,
              },
            });
          }

          // 3. Escalate linked incident severity if IA detected worse
          if (incidentId && media.incident) {
            const currentRank = SEVERITY_RANK[media.incident.severity] ?? 0;
            const aiRank = SEVERITY_RANK[findings.severity] ?? 0;
            if (aiRank > currentRank) {
              await prisma.incident.update({
                where: { id: incidentId },
                data: { severity: findings.severity },
              });
              await prisma.auditLog.create({
                data: {
                  farmId,
                  action: "ai.incident.escalated",
                  resourceType: "incident",
                  resourceId: incidentId,
                  details: `Sévérité escaladée par IA: ${media.incident.severity} → ${findings.severity}`,
                },
              });
            }
          }
        }
      },
      { connection },
    )
  : null;

worker?.on("completed", (job) => {
  console.log(`AI job completed: ${job.id}`);
});

worker?.on("failed", (job, err) => {
  console.error(`AI job failed: ${job?.id}`, err);
});

process.on("SIGINT", async () => {
  await worker?.close();
  await prisma.$disconnect();
  await connection?.quit();
  process.exit(0);
});
