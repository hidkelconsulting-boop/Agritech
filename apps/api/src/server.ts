import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import rateLimit from "@fastify/rate-limit";
import fastifyStatic from "@fastify/static";
import bcrypt from "bcryptjs";
import { Queue } from "bullmq";
import { Counter, Gauge, Registry, collectDefaultMetrics } from "prom-client";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID, createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import { prisma } from "./db.js";
import { env } from "./env.js";
import { hasPermission, requireAuth, requirePermission } from "./auth.js";
import { createRedisConnection } from "./redis.js";
import { createStripeClient, syncSubscription, PLAN_PRICE_IDS } from "./billing.js";
import { uploadFile, getPresignedUrl } from "./storage.js";

const app = Fastify({ logger: true, bodyLimit: 1_048_576 });

// Raw body parser for Stripe webhooks
app.addContentTypeParser(
  "application/json",
  { parseAs: "buffer" },
  (req, body: Buffer, done) => {
    (req as unknown as { rawBody: Buffer }).rawBody = body;
    try {
      done(null, JSON.parse(body.toString()));
    } catch (err) {
      done(err as Error);
    }
  },
);
const uploadsRoot = path.resolve(env.uploadsDir);

const metricsRegistry = new Registry();
collectDefaultMetrics({ register: metricsRegistry, prefix: "agritech_" });

const httpRequestCounter = new Counter({
  name: "agritech_http_requests_total",
  help: "Total HTTP requests handled",
  labelNames: ["method", "route", "status"],
  registers: [metricsRegistry],
});

const queueDepthGauge = new Gauge({
  name: "agritech_ai_queue_depth",
  help: "Current depth of AI processing queue",
  registers: [metricsRegistry],
});

const redisConnection = createRedisConnection();
const aiQueue = redisConnection
  ? new Queue("agritech-ai-analysis", {
      connection: redisConnection,
    })
  : null;

app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(helmet);
app.register(multipart);
app.register(rateLimit, { max: 120, timeWindow: "1 minute" });
app.register(fastifyStatic, {
  root: uploadsRoot,
  prefix: "/uploads/",
});

app.register(jwt, {
  secret: env.jwtSecret,
});

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; email: string; role: string };
    user: { sub: string; email: string; role: string };
  }
}

app.addHook("onResponse", async (request, reply) => {
  const route = request.routeOptions.url || request.url;
  httpRequestCounter.inc({ method: request.method, route, status: String(reply.statusCode) });
});

async function writeAuditLog(input: {
  farmId?: string;
  actorUserId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: string;
}) {
  await prisma.auditLog.create({ data: input });
}

function isTaskTransitionAllowed(fromStatus: string, toStatus: string): boolean {
  const transitions: Record<string, string[]> = {
    todo: ["in_progress", "done", "problem"],
    in_progress: ["done", "problem"],
    problem: ["in_progress", "done"],
    done: [],
  };

  return (transitions[fromStatus] ?? []).includes(toStatus);
}

// ─── Refresh token helpers ───────────────────────────────────────────────────
const REFRESH_TOKEN_TTL_DAYS = 7;
const ACCESS_TOKEN_TTL = "15m";

function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

async function issueTokenPair(
  reply: import("fastify").FastifyReply,
  payload: { sub: string; email: string; role: string },
) {
  const accessToken = await reply.jwtSign(payload, { expiresIn: ACCESS_TOKEN_TTL });
  const rawRefresh = randomBytes(48).toString("hex");
  const tokenHash = hashToken(rawRefresh);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 86_400_000);
  await prisma.refreshToken.create({ data: { userId: payload.sub, tokenHash, expiresAt } });
  return { accessToken, refreshToken: rawRefresh };
}

function isIncidentTransitionAllowed(fromStatus: string, toStatus: string): boolean {
  const transitions: Record<string, string[]> = {
    open: ["investigating", "resolved"],
    investigating: ["resolved", "open"],
    resolved: [],
  };

  return (transitions[fromStatus] ?? []).includes(toStatus);
}

app.get("/health", async () => {
  const depth = aiQueue ? await aiQueue.getWaitingCount() : 0;
  queueDepthGauge.set(depth);

  return {
    status: "ok",
    service: "agritech-api",
    environment: env.appEnv,
    queueEnabled: Boolean(aiQueue),
    queueDepth: depth,
  };
});

app.get("/metrics", async (_, reply) => {
  reply.header("Content-Type", metricsRegistry.contentType);
  return metricsRegistry.metrics();
});

app.post("/auth/register", async (request, reply) => {
  const schema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(10),
    farmName: z.string().min(2),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const { fullName, email, password, farmName } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return reply.status(409).send({ error: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const orgSlug = farmName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const organization = await prisma.organization.create({
    data: {
      name: `${farmName} Organization`,
      slug: `${orgSlug}-org-${randomUUID().slice(0, 6)}`,
      subscriptions: {
        create: {
          tier: "FREE",
          status: "ACTIVE",
        },
      },
    },
  });

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      role: "ADMIN",
      orgMemberships: {
        create: {
          organizationId: organization.id,
          role: "ADMIN",
        },
      },
    },
  });

  const farm = await prisma.farm.create({
    data: {
      name: farmName,
      slug: `${orgSlug}-${randomUUID().slice(0, 5)}`,
      organizationId: organization.id,
      memberships: {
        create: {
          userId: user.id,
          role: "ADMIN",
        },
      },
    },
  });

  const { accessToken, refreshToken } = await issueTokenPair(reply, {
    sub: user.id,
    email: user.email,
    role: "ADMIN",
  });

  await writeAuditLog({
    farmId: farm.id,
    actorUserId: user.id,
    action: "auth.register",
    resourceType: "farm",
    resourceId: farm.id,
    details: "Tenant bootstrap completed",
  });

  return { token: accessToken, refreshToken, user: { id: user.id, fullName, email }, farm, organization };
});

app.post("/auth/login", async (request, reply) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!isValid) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const { accessToken: loginAccess, refreshToken: loginRefresh } = await issueTokenPair(reply, {
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return { token: loginAccess, refreshToken: loginRefresh, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } };
});

// POST /auth/refresh — Exchange a valid refresh token for a new token pair
app.post("/auth/refresh", async (request, reply) => {
  const schema = z.object({ refreshToken: z.string().min(1) });
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) return reply.status(400).send({ error: "refreshToken required" });

  const tokenHash = hashToken(parsed.data.refreshToken);
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash } });

  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    return reply.status(401).send({ error: "Invalid or expired refresh token" });
  }

  // Rotate: revoke old token
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });

  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  if (!user) return reply.status(401).send({ error: "User not found" });

  const { accessToken, refreshToken: newRefresh } = await issueTokenPair(reply, {
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return { token: accessToken, refreshToken: newRefresh };
});

// POST /auth/logout — Revoke refresh token
app.post("/auth/logout", async (request, reply) => {
  const schema = z.object({ refreshToken: z.string().min(1) });
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) return reply.status(204).send();

  const tokenHash = hashToken(parsed.data.refreshToken);
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  return reply.status(204).send();
});

app.get("/auth/me", { preHandler: [requireAuth] }, async (request) => {
  const userId = (request.user as { sub: string }).sub;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      memberships: {
        select: {
          farmId: true,
          role: true,
        },
      },
      orgMemberships: {
        select: {
          organizationId: true,
          role: true,
        },
      },
    },
  });

  return user;
});

app.get("/farms", { preHandler: [async (request, reply) => request.jwtVerify().catch(() => reply.status(401).send({ error: "Unauthorized" }))] }, async (request, reply) => {
  if (reply.sent) {
    return;
  }

  const userId = (request.user as { sub: string }).sub;
  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: { farm: { include: { organization: true } } },
    orderBy: { createdAt: "desc" },
  });

  return memberships.map((membership: (typeof memberships)[number]) => ({
    farmId: membership.farmId,
    role: membership.role,
    farm: membership.farm,
  }));
});

app.get("/farms/:farmId/dashboard", { preHandler: [async (request, reply) => requirePermission(request, reply, "farm.read")] }, async (request) => {
  const farmId = (request.params as { farmId: string }).farmId;

  const [openTasks, incidentsOpen, zones, tasksToday, unreadAlerts] = await Promise.all([
    prisma.task.count({ where: { farmId, status: { not: "done" } } }),
    prisma.incident.count({ where: { farmId, status: "open" } }),
    prisma.productionZone.count({ where: { farmId } }),
    prisma.task.count({
      where: {
        farmId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.alert.count({ where: { farmId, readAt: null } }),
  ]);

  return {
    metrics: {
      openTasks,
      incidentsOpen,
      zones,
      tasksCreatedToday: tasksToday,
      unreadAlerts,
    },
  };
});

app.post("/farms/:farmId/tasks", { preHandler: [async (request, reply) => requirePermission(request, reply, "task.create")] }, async (request, reply) => {
  const farmId = (request.params as { farmId: string }).farmId;
  const actorId = (request.user as { sub: string }).sub;
  const schema = z.object({
    title: z.string().min(3),
    zoneId: z.string().optional(),
    assignedToUserId: z.string().optional(),
    dueAt: z.string().datetime().optional(),
    priority: z.enum(["low", "normal", "high"]).default("normal"),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const task = await prisma.task.create({
    data: {
      farmId,
      title: parsed.data.title,
      zoneId: parsed.data.zoneId,
      assignedToUserId: parsed.data.assignedToUserId,
      dueAt: parsed.data.dueAt ? new Date(parsed.data.dueAt) : null,
      createdByUserId: actorId,
      priority: parsed.data.priority,
    },
  });

  await writeAuditLog({
    farmId,
    actorUserId: actorId,
    action: "task.create",
    resourceType: "task",
    resourceId: task.id,
  });

  return reply.status(201).send(task);
});

app.get("/farms/:farmId/tasks", { preHandler: [async (request, reply) => requirePermission(request, reply, "task.read")] }, async (request) => {
  const farmId = (request.params as { farmId: string }).farmId;
  const tasks = await prisma.task.findMany({
    where: { farmId },
    include: {
      assignedTo: { select: { id: true, fullName: true, email: true } },
      createdBy: { select: { id: true, fullName: true } },
    },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 100,
  });

  return tasks;
});

app.patch("/farms/:farmId/tasks/:taskId/status", { preHandler: [async (request, reply) => requirePermission(request, reply, "task.update")] }, async (request, reply) => {
  const { farmId, taskId } = request.params as { farmId: string; taskId: string };
  const actorId = (request.user as { sub: string }).sub;

  const schema = z.object({
    status: z.enum(["todo", "in_progress", "done", "problem"]),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const task = await prisma.task.findFirst({ where: { id: taskId, farmId } });
  if (!task) {
    return reply.status(404).send({ error: "Task not found" });
  }

  if (!isTaskTransitionAllowed(task.status, parsed.data.status) && task.status !== parsed.data.status) {
    return reply.status(409).send({ error: `Invalid task transition: ${task.status} -> ${parsed.data.status}` });
  }

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: {
      status: parsed.data.status,
      completedAt: parsed.data.status === "done" ? new Date() : null,
    },
  });

  await writeAuditLog({
    farmId,
    actorUserId: actorId,
    action: "task.status.update",
    resourceType: "task",
    resourceId: updated.id,
    details: `${task.status} -> ${parsed.data.status}`,
  });

  return updated;
});

app.get("/farms/:farmId/incidents", { preHandler: [async (request, reply) => requirePermission(request, reply, "incident.read")] }, async (request) => {
  const farmId = (request.params as { farmId: string }).farmId;
  const incidents = await prisma.incident.findMany({
    where: { farmId },
    include: {
      reportedBy: { select: { id: true, fullName: true } },
      resolvedBy: { select: { id: true, fullName: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return incidents;
});

app.post("/farms/:farmId/incidents", { preHandler: [async (request, reply) => requirePermission(request, reply, "incident.create")] }, async (request, reply) => {
  const farmId = (request.params as { farmId: string }).farmId;
  const actorId = (request.user as { sub: string }).sub;

  const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(3).max(1500).optional(),
    severity: z.enum(["low", "medium", "high", "critical"]).default("medium"),
    zoneId: z.string().optional(),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const incident = await prisma.incident.create({
    data: {
      farmId,
      zoneId: parsed.data.zoneId,
      title: parsed.data.title,
      description: parsed.data.description,
      severity: parsed.data.severity,
      status: "open",
      reportedByUserId: actorId,
    },
  });

  await writeAuditLog({
    farmId,
    actorUserId: actorId,
    action: "incident.create",
    resourceType: "incident",
    resourceId: incident.id,
  });

  return reply.status(201).send(incident);
});

app.patch("/farms/:farmId/incidents/:incidentId/status", { preHandler: [async (request, reply) => requirePermission(request, reply, "incident.update")] }, async (request, reply) => {
  const { farmId, incidentId } = request.params as { farmId: string; incidentId: string };
  const actorId = (request.user as { sub: string }).sub;

  const schema = z.object({
    status: z.enum(["open", "investigating", "resolved"]),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const incident = await prisma.incident.findFirst({ where: { id: incidentId, farmId } });
  if (!incident) {
    return reply.status(404).send({ error: "Incident not found" });
  }

  if (!isIncidentTransitionAllowed(incident.status, parsed.data.status) && incident.status !== parsed.data.status) {
    return reply.status(409).send({ error: `Invalid incident transition: ${incident.status} -> ${parsed.data.status}` });
  }

  const updated = await prisma.incident.update({
    where: { id: incident.id },
    data: {
      status: parsed.data.status,
      resolvedByUserId: parsed.data.status === "resolved" ? actorId : null,
    },
  });

  await writeAuditLog({
    farmId,
    actorUserId: actorId,
    action: "incident.status.update",
    resourceType: "incident",
    resourceId: updated.id,
    details: `${incident.status} -> ${parsed.data.status}`,
  });

  return updated;
});

app.post("/farms/:farmId/media", { preHandler: [async (request, reply) => requirePermission(request, reply, "media.upload")] }, async (request, reply) => {
  const farmId = (request.params as { farmId: string }).farmId;
  const actorId = (request.user as { sub: string }).sub;
  const taskId = (request.query as { taskId?: string }).taskId;
  const incidentId = (request.query as { incidentId?: string }).incidentId;
  const forceAiSeverity = (request.query as { forceAiSeverity?: string }).forceAiSeverity;
  const file = await request.file();

  if (!file) {
    return reply.status(400).send({ error: "Missing multipart file" });
  }

  const extension = file.filename.includes(".") ? file.filename.split(".").pop() : "bin";
  const storageKey = `farms/${farmId}/${Date.now()}-${randomUUID()}.${extension}`;
  const chunks: Buffer[] = [];

  for await (const chunk of file.file) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);
  const { key: storedKey } = await uploadFile(buffer, storageKey, file.mimetype);

  const media = await prisma.mediaAsset.create({
    data: {
      farmId,
      taskId,
      incidentId,
      filePath: storedKey,
      mimeType: file.mimetype,
      fileSize: buffer.byteLength,
      uploadedByUserId: actorId,
    },
  });

  await writeAuditLog({
    farmId,
    actorUserId: actorId,
    action: "media.upload",
    resourceType: "media",
    resourceId: media.id,
    details: media.filePath,
  });

  if (aiQueue) {
    await aiQueue.add("analyze-image", {
      mediaId: media.id,
      farmId,
      incidentId,
      taskId,
      // Dev/test helper for deterministic end-to-end validation.
      forceAiSeverity: env.appEnv === "production" ? undefined : forceAiSeverity,
    });
    const waitingCount = await aiQueue.getWaitingCount();
    queueDepthGauge.set(waitingCount);
  }

  return reply.status(201).send(media);
});

// Return a presigned URL for a media asset (1-hour expiry)
app.get("/farms/:farmId/media/:mediaId/url", { preHandler: [async (request, reply) => requirePermission(request, reply, "media.upload")] }, async (request, reply) => {
  const { farmId, mediaId } = request.params as { farmId: string; mediaId: string };
  const asset = await prisma.mediaAsset.findFirst({ where: { id: mediaId, farmId } });
  if (!asset) return reply.status(404).send({ error: "Media not found" });
  const url = await getPresignedUrl(asset.filePath, 3600);
  return { url, expiresIn: 3600 };
});

app.get("/farms/:farmId/ai-analyses", { preHandler: [async (request, reply) => requirePermission(request, reply, "farm.read")] }, async (request) => {
  const farmId = (request.params as { farmId: string }).farmId;
  return prisma.aiAnalysis.findMany({
    where: { farmId },
    include: {
      mediaAsset: {
        select: {
          id: true,
          filePath: true,
          mimeType: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
});

app.post("/farms/:farmId/members", { preHandler: [async (request, reply) => requirePermission(request, reply, "member.manage")] }, async (request, reply) => {
  const farmId = (request.params as { farmId: string }).farmId;
  const actorId = (request.user as { sub: string }).sub;

  const schema = z.object({
    email: z.string().email(),
    fullName: z.string().min(2),
    role: z.enum(["ADMIN", "MANAGER", "WORKER"]),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const farm = await prisma.farm.findUnique({ where: { id: farmId } });
  if (!farm) {
    return reply.status(404).send({ error: "Farm not found" });
  }

  let user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) {
    const temporaryPasswordHash = await bcrypt.hash(randomUUID(), 10);
    user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        fullName: parsed.data.fullName,
        passwordHash: temporaryPasswordHash,
        role: parsed.data.role,
      },
    });
  }

  const membership = await prisma.membership.upsert({
    where: { userId_farmId: { userId: user.id, farmId } },
    update: { role: parsed.data.role },
    create: {
      userId: user.id,
      farmId,
      role: parsed.data.role,
    },
  });

  await writeAuditLog({
    farmId,
    actorUserId: actorId,
    action: "membership.upsert",
    resourceType: "membership",
    resourceId: membership.id,
    details: `${parsed.data.email}:${parsed.data.role}`,
  });

  return membership;
});

app.get("/permissions/self/:farmId", { preHandler: [requireAuth] }, async (request, reply) => {
  const { farmId } = request.params as { farmId: string };
  const userId = (request.user as { sub: string }).sub;

  const membership = await prisma.membership.findUnique({
    where: { userId_farmId: { userId, farmId } },
  });

  if (!membership) {
    return reply.status(403).send({ error: "Forbidden" });
  }

  return {
    role: membership.role,
    permissions: [
      "farm.read",
      "farm.manage",
      "task.read",
      "task.create",
      "task.update",
      "incident.read",
      "incident.create",
      "incident.update",
      "media.upload",
      "member.manage",
      "billing.manage",
    ].filter((permission) => hasPermission(membership.role, permission)),
  };
});

app.get("/admin/organizations", { preHandler: [requireAuth] }, async (request, reply) => {
  if ((request.user as { role: string }).role !== "ADMIN") {
    return reply.status(403).send({ error: "Only platform admins can access this route" });
  }

  const organizations = await prisma.organization.findMany({
    include: {
      subscriptions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      farms: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return organizations;
});

app.post("/admin/organizations/:organizationId/subscription", { preHandler: [requireAuth] }, async (request, reply) => {
  if ((request.user as { role: string }).role !== "ADMIN") {
    return reply.status(403).send({ error: "Only platform admins can access this route" });
  }

  const { organizationId } = request.params as { organizationId: string };
  const schema = z.object({
    tier: z.enum(["FREE", "PRO", "ENTERPRISE"]),
    status: z.enum(["TRIAL", "ACTIVE", "PAST_DUE", "CANCELED"]),
    renewsAt: z.string().datetime().optional(),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  const subscription = await prisma.subscription.create({
    data: {
      organizationId,
      tier: parsed.data.tier,
      status: parsed.data.status,
      renewsAt: parsed.data.renewsAt ? new Date(parsed.data.renewsAt) : null,
    },
  });

  return reply.status(201).send(subscription);
});

// ─── Billing routes ─────────────────────────────────────────────────────────

// POST /billing/checkout — Create Stripe Checkout Session
app.post("/billing/checkout", { preHandler: [requireAuth] }, async (request, reply) => {
  const stripe = createStripeClient();
  if (!stripe) {
    return reply.status(503).send({ error: "Stripe not configured" });
  }

  const userId = (request.user as { sub: string }).sub;
  const schema = z.object({
    tier: z.enum(["PRO", "ENTERPRISE"]),
    organizationId: z.string(),
  });

  const parsed = schema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: parsed.error.flatten() });
  }

  // Verify user is member of this organization
  const orgMembership = await prisma.organizationMember.findFirst({
    where: { organizationId: parsed.data.organizationId, userId },
  });
  if (!orgMembership || orgMembership.role !== "ADMIN") {
    return reply.status(403).send({ error: "Only org admins can manage billing" });
  }

  const org = await prisma.organization.findUnique({
    where: { id: parsed.data.organizationId },
    include: { subscriptions: { orderBy: { createdAt: "desc" }, take: 1 } },
  });
  if (!org) {
    return reply.status(404).send({ error: "Organization not found" });
  }

  const sub = org.subscriptions[0];
  const priceId = PLAN_PRICE_IDS[parsed.data.tier];

  // Reuse existing Stripe customer or pass email for new one
  const actor = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  const customerParams: { customer?: string; customer_email?: string } = sub?.stripeCustomerId
    ? { customer: sub.stripeCustomerId }
    : { customer_email: actor?.email };

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.webAppUrl}/app?billing=success`,
    cancel_url: `${env.webAppUrl}/app?billing=canceled`,
    metadata: { organizationId: parsed.data.organizationId },
    ...customerParams,
  });

  return reply.send({ url: session.url, sessionId: session.id });
});

// GET /billing/portal — Customer portal (manage/cancel plan)
app.post("/billing/portal", { preHandler: [requireAuth] }, async (request, reply) => {
  const stripe = createStripeClient();
  if (!stripe) {
    return reply.status(503).send({ error: "Stripe not configured" });
  }

  const userId = (request.user as { sub: string }).sub;
  const schema = z.object({ organizationId: z.string() });
  const parsed = schema.safeParse(request.body);
  if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

  const sub = await prisma.subscription.findFirst({
    where: { organizationId: parsed.data.organizationId },
    orderBy: { createdAt: "desc" },
  });
  if (!sub?.stripeCustomerId) {
    return reply.status(404).send({ error: "No Stripe customer found for this organization" });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${env.webAppUrl}/app`,
  });

  return reply.send({ url: portalSession.url });
});

// POST /billing/webhook — Stripe webhook handler (raw body required)
app.post("/billing/webhook", {
  config: { rawBody: true },
  onRequest: async (request, reply) => {
    // Skip JWT auth for webhooks
    return;
  },
}, async (request, reply) => {
  const stripe = createStripeClient();
  if (!stripe || !env.stripeWebhookSecret) {
    return reply.status(503).send({ error: "Stripe webhook not configured" });
  }

  const sig = request.headers["stripe-signature"] as string;
  if (!sig) return reply.status(400).send({ error: "Missing stripe-signature header" });

  let event: import("stripe").Stripe.Event;
  try {
    const rawBody = (request as { rawBody?: Buffer }).rawBody;
    if (!rawBody) {
      return reply.status(400).send({ error: "No raw body" });
    }
    event = stripe.webhooks.constructEvent(rawBody, sig, env.stripeWebhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "invalid signature";
    return reply.status(400).send({ error: msg });
  }

  const organizationId = (event.data.object as { metadata?: { organizationId?: string } })
    .metadata?.organizationId;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as import("stripe").Stripe.Checkout.Session;
      if (session.subscription && organizationId) {
        await syncSubscription(stripe, String(session.subscription), organizationId);
      }
      break;
    }
    case "invoice.payment_succeeded":
    case "invoice.payment_failed": {
      const invoice = event.data.object as import("stripe").Stripe.Invoice;
      if (invoice.subscription && organizationId) {
        await syncSubscription(stripe, String(invoice.subscription), organizationId);
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const stripeSub = event.data.object as import("stripe").Stripe.Subscription;
      if (organizationId) {
        await syncSubscription(stripe, stripeSub.id, organizationId);
      }
      break;
    }
    default:
      break;
  }

  return reply.send({ received: true });
});

// ─── Analytics routes ────────────────────────────────────────────────────────

  // GET /farms/:farmId/analytics/overview — Aggregated KPIs for a date range
  app.get("/farms/:farmId/analytics/overview", {
    preHandler: [async (req, reply) => requirePermission(req, reply, "farm.read")],
  }, async (request, reply) => {
    const farmId = (request.params as { farmId: string }).farmId;
    const query = request.query as { from?: string; to?: string };

    const from = query.from ? new Date(query.from) : new Date(Date.now() - 30 * 86_400_000);
    const to = query.to ? new Date(query.to) : new Date();

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return reply.status(400).send({ error: "Invalid date range" });
    }

    const dateRange = { gte: from, lte: to };

    const [
      totalTasks,
      completedTasks,
      problemTasks,
      totalIncidents,
      resolvedIncidents,
      criticalIncidents,
      mediaUploads,
      aiAnalyses,
      tasksByPriority,
      incidentsBySeverity,
      auditActivity,
      unreadAlerts,
    ] = await Promise.all([
      prisma.task.count({ where: { farmId, createdAt: dateRange } }),
      prisma.task.count({ where: { farmId, status: "done", createdAt: dateRange } }),
      prisma.task.count({ where: { farmId, status: "problem", createdAt: dateRange } }),
      prisma.incident.count({ where: { farmId, createdAt: dateRange } }),
      prisma.incident.count({ where: { farmId, status: "resolved", createdAt: dateRange } }),
      prisma.incident.count({ where: { farmId, severity: "critical", createdAt: dateRange } }),
      prisma.mediaAsset.count({ where: { farmId, createdAt: dateRange } }),
      prisma.aiAnalysis.count({ where: { farmId, createdAt: dateRange } }),
      prisma.task.groupBy({
        by: ["priority"],
        where: { farmId, createdAt: dateRange },
        _count: { id: true },
      }),
      prisma.incident.groupBy({
        by: ["severity"],
        where: { farmId, createdAt: dateRange },
        _count: { id: true },
      }),
      prisma.auditLog.count({ where: { farmId, createdAt: dateRange } }),
      prisma.alert.count({ where: { farmId, readAt: null } }),
    ]);

    return {
      period: { from, to },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        problem: problemTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        byPriority: Object.fromEntries(tasksByPriority.map((r: { priority: string; _count: { id: number } }) => [r.priority, r._count.id])),
      },
      incidents: {
        total: totalIncidents,
        resolved: resolvedIncidents,
        critical: criticalIncidents,
        resolutionRate: totalIncidents > 0 ? Math.round((resolvedIncidents / totalIncidents) * 100) : 0,
        bySeverity: Object.fromEntries(incidentsBySeverity.map((r: { severity: string; _count: { id: number } }) => [r.severity, r._count.id])),
      },
      media: { uploads: mediaUploads, aiAnalyses },
      activity: { auditEvents: auditActivity },
      alerts: { unread: unreadAlerts },
    };
  });

  // GET /farms/:farmId/analytics/timeseries — Daily tasks + incidents counts
  app.get("/farms/:farmId/analytics/timeseries", {
    preHandler: [async (req, reply) => requirePermission(req, reply, "farm.read")],
  }, async (request, reply) => {
    const farmId = (request.params as { farmId: string }).farmId;
    const query = request.query as { from?: string; to?: string };

    const from = query.from ? new Date(query.from) : new Date(Date.now() - 30 * 86_400_000);
    const to = query.to ? new Date(query.to) : new Date();

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return reply.status(400).send({ error: "Invalid date range" });
    }

    // Fetch raw records and bucket by day in JS (works on both SQLite and PostgreSQL)
    const [tasks, incidents] = await Promise.all([
      prisma.task.findMany({
        where: { farmId, createdAt: { gte: from, lte: to } },
        select: { createdAt: true, status: true },
      }),
      prisma.incident.findMany({
        where: { farmId, createdAt: { gte: from, lte: to } },
        select: { createdAt: true, severity: true },
      }),
    ]);

    const dayBucket = (date: Date) => date.toISOString().slice(0, 10);

    const tasksByDay: Record<string, number> = {};
    const completedByDay: Record<string, number> = {};
    for (const t of tasks) {
      const d = dayBucket(t.createdAt);
      tasksByDay[d] = (tasksByDay[d] ?? 0) + 1;
      if (t.status === "done") completedByDay[d] = (completedByDay[d] ?? 0) + 1;
    }

    const incidentsByDay: Record<string, number> = {};
    for (const i of incidents) {
      const d = dayBucket(i.createdAt);
      incidentsByDay[d] = (incidentsByDay[d] ?? 0) + 1;
    }

    // Build complete date axis
    const days: string[] = [];
    const cursor = new Date(from);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(to);
    end.setHours(23, 59, 59, 999);
    while (cursor <= end) {
      days.push(dayBucket(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    return days.map((day) => ({
      date: day,
      tasksCreated: tasksByDay[day] ?? 0,
      tasksCompleted: completedByDay[day] ?? 0,
      incidents: incidentsByDay[day] ?? 0,
    }));
  });

  // GET /farms/:farmId/analytics/audit-trail — Recent audit log with pagination
  app.get("/farms/:farmId/analytics/audit-trail", {
    preHandler: [async (req, reply) => requirePermission(req, reply, "farm.read")],
  }, async (request) => {
    const farmId = (request.params as { farmId: string }).farmId;
    const query = request.query as { page?: string; limit?: string };
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));

    const [entries, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: { farmId },
        include: { actor: { select: { id: true, fullName: true, email: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.auditLog.count({ where: { farmId } }),
    ]);

    return { entries, total, page, limit, pages: Math.ceil(total / limit) };
  });

// ─── Alerts routes ───────────────────────────────────────────────────────────

app.get("/farms/:farmId/alerts", { preHandler: [async (req, reply) => requirePermission(req, reply, "farm.read")] }, async (request) => {
  const farmId = (request.params as { farmId: string }).farmId;
  const { unreadOnly } = request.query as { unreadOnly?: string };
  return prisma.alert.findMany({
    where: { farmId, ...(unreadOnly === "true" ? { readAt: null } : {}) },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
});

app.patch("/farms/:farmId/alerts/:alertId/read", { preHandler: [async (req, reply) => requirePermission(req, reply, "farm.read")] }, async (request, reply) => {
  const { farmId, alertId } = request.params as { farmId: string; alertId: string };
  const alert = await prisma.alert.findFirst({ where: { id: alertId, farmId } });
  if (!alert) return reply.status(404).send({ error: "Alert not found" });
  const updated = await prisma.alert.update({ where: { id: alertId }, data: { readAt: new Date() } });
  return updated;
});

app.delete("/farms/:farmId/alerts/:alertId", { preHandler: [async (req, reply) => requirePermission(req, reply, "farm.manage")] }, async (request, reply) => {
  const { farmId, alertId } = request.params as { farmId: string; alertId: string };
  const alert = await prisma.alert.findFirst({ where: { id: alertId, farmId } });
  if (!alert) return reply.status(404).send({ error: "Alert not found" });
  await prisma.alert.delete({ where: { id: alertId } });
  return reply.status(204).send();
});

const start = async () => {
  try {
    await app.listen({ port: env.apiPort, host: "0.0.0.0" });
    app.log.info(`API listening on ${env.apiPort}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
