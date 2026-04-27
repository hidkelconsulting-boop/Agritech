"use client";

import { useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
};

type Incident = {
  id: string;
  title: string;
  status: string;
  severity: string;
};

type Alert = {
  id: string;
  title: string;
  message: string;
  severity: string;
  readAt: string | null;
  createdAt: string;
};

type AiAnalysis = {
  id: string;
  summary: string;
  confidence: string;
  model: string;
  createdAt: string;
  mediaAsset: { id: string; filePath: string; mimeType: string };
};

type Props = {
  farmId: string;
  farmName: string;
  dashboard: {
    metrics: {
      openTasks: number;
      incidentsOpen: number;
      zones: number;
      tasksCreatedToday: number;
      unreadAlerts: number;
    };
  };
  tasks: Task[];
  incidents: Incident[];
  alerts: Alert[];
  aiAnalyses: AiAnalysis[];
};

export default function AppShell({ farmId, farmName, dashboard, tasks: initialTasks, incidents: initialIncidents, alerts: initialAlerts, aiAnalyses }: Props) {
  const [tasks, setTasks] = useState(initialTasks);
  const [incidents, setIncidents] = useState(initialIncidents);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [newTask, setNewTask] = useState("");
  const [newIncident, setNewIncident] = useState("");
  const [message, setMessage] = useState("");

  const openTasks = useMemo(() => tasks.filter((task) => task.status !== "done").length, [tasks]);
  const openIncidents = useMemo(() => incidents.filter((incident) => incident.status !== "resolved").length, [incidents]);

  async function createTask() {
    if (!newTask.trim()) {
      return;
    }

    const response = await fetch(`/api/proxy/farms/${farmId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask.trim(), priority: "normal" }),
    });

    if (!response.ok) {
      setMessage("Impossible de creer la tache.");
      return;
    }

    const created = await response.json();
    setTasks((previous) => [created, ...previous]);
    setNewTask("");
    setMessage("Tache creee.");
  }

  async function updateTaskStatus(taskId: string, status: string) {
    const response = await fetch(`/api/proxy/farms/${farmId}/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setMessage("Transition invalide pour la tache.");
      return;
    }

    const updated = await response.json();
    setTasks((previous) => previous.map((task) => (task.id === updated.id ? updated : task)));
    setMessage("Statut tache mis a jour.");
  }

  async function createIncident() {
    if (!newIncident.trim()) {
      return;
    }

    const response = await fetch(`/api/proxy/farms/${farmId}/incidents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newIncident.trim(), severity: "medium" }),
    });

    if (!response.ok) {
      setMessage("Impossible de creer l'incident.");
      return;
    }

    const created = await response.json();
    setIncidents((previous) => [created, ...previous]);
    setNewIncident("");
    setMessage("Incident cree.");
  }

  async function updateIncidentStatus(incidentId: string, status: string) {
    const response = await fetch(`/api/proxy/farms/${farmId}/incidents/${incidentId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setMessage("Transition invalide pour l'incident.");
      return;
    }

    const updated = await response.json();
    setIncidents((previous) => previous.map((incident) => (incident.id === updated.id ? updated : incident)));
    setMessage("Statut incident mis a jour.");
  }

  async function uploadEvidence(event: React.ChangeEvent<HTMLInputElement>, taskId?: string, incidentId?: string) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("file", file);

    const params = new URLSearchParams();
    if (taskId) {
      params.set("taskId", taskId);
    }
    if (incidentId) {
      params.set("incidentId", incidentId);
    }

    const response = await fetch(`/api/proxy/farms/${farmId}/media?${params.toString()}`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      setMessage("Upload impossible.");
      return;
    }

    setMessage("Preuve photo envoyee.");
    event.target.value = "";
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  async function markAlertRead(alertId: string) {
    await fetch(`/api/proxy/farms/${farmId}/alerts/${alertId}/read`, { method: "PATCH" });
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }

  const severityBadge = (severity: string) => {
    if (severity === "critical") return "bg-red-100 border-red-300 text-red-800";
    if (severity === "high") return "bg-orange-100 border-orange-300 text-orange-800";
    if (severity === "medium") return "bg-amber-100 border-amber-300 text-amber-800";
    return "bg-slate-100 border-slate-200 text-slate-700";
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <header className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-3xl font-black text-slate-900">Cockpit Terrain - {farmName}</h1>
        <p className="mt-2 text-slate-600">Workflow chef de site, execution terrain, incidents, preuves photo.</p>
        <div className="mt-3 flex gap-2">
          <a href="/admin" className="rounded bg-slate-100 px-3 py-1 text-sm">Super Admin</a>
          {/* LEGACY - sprint demo: <a href="/app/analytics" className="rounded bg-slate-100 px-3 py-1 text-sm">Analytics</a> */}
          <button onClick={logout} className="rounded bg-slate-900 px-3 py-1 text-sm text-white">Se deconnecter</button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          <Metric title="Taches ouvertes" value={String(openTasks)} />
          <Metric title="Incidents ouverts" value={String(openIncidents)} />
          <Metric title="Zones" value={String(dashboard.metrics.zones)} />
          <Metric title="Taches du jour" value={String(dashboard.metrics.tasksCreatedToday)} />
          <Metric title="Alertes IA" value={String(alerts.length)} highlight={alerts.length > 0} />
        </div>
        {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
      </header>

      {/* Alerts panel */}
      {alerts.length > 0 && (
        <section className="rounded-2xl border border-amber-300 bg-amber-50 p-5 shadow">
          <h2 className="text-lg font-bold text-amber-900 mb-3">Alertes IA ({alerts.length} non lues)</h2>
          <ul className="space-y-2">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className={`flex items-start justify-between gap-3 rounded-xl border p-3 ${severityBadge(alert.severity)}`}
              >
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{alert.title}</p>
                  <p className="text-xs mt-0.5 opacity-80 line-clamp-2">{alert.message}</p>
                </div>
                <button
                  onClick={() => markAlertRead(alert.id)}
                  className="shrink-0 rounded bg-white/60 px-2 py-1 text-xs font-medium hover:bg-white"
                >
                  Vu ✓
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-slate-900">Taches</h2>
          <div className="mt-3 flex gap-2">
            <input
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Nouvelle tache"
            />
            <button onClick={createTask} className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white">
              Ajouter
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="rounded-xl border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{task.title}</p>
                <p className="text-sm text-slate-600">{task.status} • {task.priority}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={() => updateTaskStatus(task.id, "in_progress")} className="rounded bg-blue-100 px-2 py-1 text-xs">En cours</button>
                  <button onClick={() => updateTaskStatus(task.id, "done")} className="rounded bg-green-100 px-2 py-1 text-xs">Terminee</button>
                  <button onClick={() => updateTaskStatus(task.id, "problem")} className="rounded bg-amber-100 px-2 py-1 text-xs">Probleme</button>
                  <label className="cursor-pointer rounded bg-slate-100 px-2 py-1 text-xs">
                    Photo
                    <input className="hidden" type="file" accept="image/*" onChange={(event) => uploadEvidence(event, task.id)} />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-slate-900">Incidents</h2>
          <div className="mt-3 flex gap-2">
            <input
              value={newIncident}
              onChange={(event) => setNewIncident(event.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Nouvel incident"
            />
            <button onClick={createIncident} className="rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white">
              Declarer
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {incidents.map((incident) => (
              <li key={incident.id} className="rounded-xl border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{incident.title}</p>
                <p className="text-sm text-slate-600">{incident.status} • {incident.severity}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={() => updateIncidentStatus(incident.id, "investigating")} className="rounded bg-blue-100 px-2 py-1 text-xs">Investigation</button>
                  <button onClick={() => updateIncidentStatus(incident.id, "resolved")} className="rounded bg-green-100 px-2 py-1 text-xs">Resolue</button>
                  <label className="cursor-pointer rounded bg-slate-100 px-2 py-1 text-xs">
                    Photo
                    <input className="hidden" type="file" accept="image/*" onChange={(event) => uploadEvidence(event, undefined, incident.id)} />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* AI analyses panel */}
      {aiAnalyses.length > 0 && (
        <section className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Analyses IA récentes</h2>
          <ul className="space-y-3">
            {aiAnalyses.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    a.confidence === "high"
                      ? "bg-green-100 text-green-800"
                      : a.confidence === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {a.confidence}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-slate-800">{a.summary}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.model} · {new Date(a.createdAt).toLocaleDateString("fr-FR")}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

function Metric({ title, value, highlight }: { title: string; value: string; highlight?: boolean }) {
  return (
    <article className={`rounded-xl border p-3 ${highlight ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-slate-50"}`}>
      <p className="text-xs uppercase tracking-wide text-slate-600">{title}</p>
      <p className={`mt-1 text-2xl font-black ${highlight ? "text-amber-700" : "text-slate-900"}`}>{value}</p>
    </article>
  );
}
