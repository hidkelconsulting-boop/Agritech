#!/usr/bin/env node

const BASE = process.env.E2E_BASE_URL || "http://localhost:4000";
const EMAIL = process.env.E2E_EMAIL || "admin@agritech.local";
const PASSWORD = process.env.E2E_PASSWORD || "ChangeMe123!";
const FORCE_SEVERITY = (process.env.E2E_FORCE_SEVERITY || "").trim().toLowerCase();

async function api(path, { method = "GET", token, body, isForm = false } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isForm) headers["Content-Type"] = "application/json";

  const response = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let parsed;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }

  if (!response.ok) {
    throw new Error(`${method} ${path} -> ${response.status} ${JSON.stringify(parsed)}`);
  }

  return parsed;
}

function buildPng() {
  // Static, valid tiny PNG to keep the script dependency-free.
  return Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAALUlEQVR4nO3NMQEAAAwCoNm/9HI83hM0QY0aNWrUqFGjRo0aNWrUqFGjRo36A8QPAf6qVfFlAAAAAElFTkSuQmCC",
    "base64",
  );
}

async function main() {
  const login = await api("/auth/login", {
    method: "POST",
    body: { email: EMAIL, password: PASSWORD },
  });

  const token = login.token;
  const farms = await api("/farms", { token });
  const farmId = farms[0]?.farmId;

  if (!farmId) {
    throw new Error("No farm membership found for test user");
  }

  const incident = await api(`/farms/${farmId}/incidents`, {
    method: "POST",
    token,
    body: {
      title: "E2E IA scenario",
      severity: "low",
      description: "Test automatique pipeline IA + règles métier",
    },
  });

  const blob = new Blob([buildPng()], { type: "image/png" });
  const form = new FormData();
  form.append("file", blob, "e2e.png");

  const beforeAlerts = await api(`/farms/${farmId}/alerts?unreadOnly=true`, { token });
  const beforeTasks = await api(`/farms/${farmId}/tasks`, { token });

  const uploadQuery = new URLSearchParams({ incidentId: incident.id });
  if (FORCE_SEVERITY) {
    uploadQuery.set("forceAiSeverity", FORCE_SEVERITY);
  }

  const media = await api(`/farms/${farmId}/media?${uploadQuery.toString()}`, {
    method: "POST",
    token,
    body: form,
    isForm: true,
  });

  // Poll until we find the analysis tied to this exact media upload.
  const waitMs = Number(process.env.E2E_WAIT_MS || 12000);
  const started = Date.now();
  let analyses = [];
  let targetAnalysis = null;
  while (Date.now() - started < waitMs) {
    analyses = await api(`/farms/${farmId}/ai-analyses`, { token });
    targetAnalysis = analyses.find((a) => a.mediaAsset?.id === media.id) ?? null;
    if (targetAnalysis) break;
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
  if (!targetAnalysis) {
    throw new Error("No AI analysis found for uploaded media within timeout");
  }

  const alerts = await api(`/farms/${farmId}/alerts?unreadOnly=true`, { token });
  const tasks = await api(`/farms/${farmId}/tasks`, { token });
  const incidents = await api(`/farms/${farmId}/incidents`, { token });
  const dashboard = await api(`/farms/${farmId}/dashboard`, { token });

  const raw = targetAnalysis.rawJson ? JSON.parse(targetAnalysis.rawJson) : {};
  const beforeAutoTaskCount = beforeTasks.filter((t) => String(t.title || "").startsWith("[IA]")).length;
  const afterAutoTaskCount = tasks.filter((t) => String(t.title || "").startsWith("[IA]")).length;
  const currentIncident = incidents.find((i) => i.id === incident.id);

  console.log(JSON.stringify({
    farmId,
    incidentId: incident.id,
    mediaId: media.id,
    forcedSeverity: FORCE_SEVERITY || null,
    analysisId: targetAnalysis.id,
    model: targetAnalysis.model,
    anomalyDetected: raw.anomaly_detected,
    severity: raw.severity,
    confidence: targetAnalysis.confidence,
    alertsUnreadBefore: beforeAlerts.length,
    alertsUnreadAfter: alerts.length,
    alertsUnreadDelta: alerts.length - beforeAlerts.length,
    autoTaskCountBefore: beforeAutoTaskCount,
    autoTaskCountAfter: afterAutoTaskCount,
    autoTaskCountDelta: afterAutoTaskCount - beforeAutoTaskCount,
    incidentSeverityNow: currentIncident?.severity,
    dashboardUnreadAlerts: dashboard?.metrics?.unreadAlerts,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
