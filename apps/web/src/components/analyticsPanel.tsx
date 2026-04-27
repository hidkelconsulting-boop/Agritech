"use client";

import { useState } from "react";
import Link from "next/link";

interface OverviewData {
  period: { from: string; to: string };
  tasks: {
    total: number;
    completed: number;
    problem: number;
    completionRate: number;
    byPriority: Record<string, number>;
  };
  incidents: {
    total: number;
    resolved: number;
    critical: number;
    resolutionRate: number;
    bySeverity: Record<string, number>;
  };
  media: { uploads: number; aiAnalyses: number };
  activity: { auditEvents: number };
  alerts?: { unread: number };
}

interface TimeseriesEntry {
  date: string;
  tasksCreated: number;
  tasksCompleted: number;
  incidents: number;
}

interface Props {
  farmName: string;
  overview: OverviewData | null;
  timeseries: TimeseriesEntry[];
}

function MetricCard({ label, value, sub, color }: { label: string; value: number | string; sub?: string; color?: string }) {
  return (
    <div className={`rounded-lg border p-4 bg-white shadow-sm ${color ?? ""}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function MiniBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-20 text-gray-600 capitalize">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-right text-gray-700">{value}</span>
    </div>
  );
}

export default function AnalyticsPanel({ farmName, overview, timeseries }: Props) {
  const [range, setRange] = useState("30d");

  const maxPriority = overview ? Math.max(...Object.values(overview.tasks.byPriority), 1) : 1;
  const maxSeverity = overview ? Math.max(...Object.values(overview.incidents.bySeverity), 1) : 1;

  // Sparkline — simple ASCII-style bar chart in SVG
  const maxVal = Math.max(...timeseries.map((d) => Math.max(d.tasksCreated, d.incidents)), 1);
  const chartW = 600;
  const chartH = 80;
  const barW = timeseries.length > 0 ? Math.floor(chartW / timeseries.length) - 1 : 10;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500">{farmName}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-white border rounded-lg p-1">
              {["7d", "30d", "90d"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 text-sm rounded ${range === r ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            {/* LEGACY - sprint demo: <Link href="/app" className="text-sm text-gray-500 hover:text-gray-800">← Cockpit</Link> */}
          </div>
        </div>

        {!overview ? (
          <div className="text-center py-12 text-gray-400">Chargement des données…</div>
        ) : (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <MetricCard
                label="Tâches créées"
                value={overview.tasks.total}
                sub={`${overview.tasks.completed} complétées`}
              />
              <MetricCard
                label="Taux de complétion"
                value={`${overview.tasks.completionRate}%`}
                sub={`${overview.tasks.problem} en problème`}
                color={overview.tasks.completionRate >= 70 ? "" : "border-orange-300"}
              />
              <MetricCard
                label="Incidents"
                value={overview.incidents.total}
                sub={`${overview.incidents.resolved} résolus`}
              />
              <MetricCard
                label="Taux de résolution"
                value={`${overview.incidents.resolutionRate}%`}
                sub={`${overview.incidents.critical} critiques`}
                color={overview.incidents.critical > 0 ? "border-red-300" : ""}
              />
            </div>

            {/* Secondary cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <MetricCard label="Médias uploadés" value={overview.media.uploads} />
              <MetricCard label="Analyses IA" value={overview.media.aiAnalyses} />
              <MetricCard label="Événements audit" value={overview.activity.auditEvents} />
              <MetricCard label="Alertes non lues" value={overview.alerts?.unread ?? 0} /></div>

            {/* Timeseries chart */}
            <div className="bg-white rounded-lg border p-4 mb-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Activité quotidienne (30 derniers jours)</h2>
              <div className="overflow-x-auto">
                <svg width={chartW} height={chartH + 20} className="text-xs">
                  {timeseries.map((d, i) => (
                    <g key={d.date}>
                      {/* Tasks bar */}
                      <rect
                        x={i * (barW + 1)}
                        y={chartH - Math.round((d.tasksCreated / maxVal) * chartH)}
                        width={Math.max(barW / 2 - 1, 2)}
                        height={Math.round((d.tasksCreated / maxVal) * chartH)}
                        fill="#16a34a"
                        opacity={0.8}
                      />
                      {/* Incidents bar */}
                      <rect
                        x={i * (barW + 1) + Math.max(barW / 2, 3)}
                        y={chartH - Math.round((d.incidents / maxVal) * chartH)}
                        width={Math.max(barW / 2 - 1, 2)}
                        height={Math.round((d.incidents / maxVal) * chartH)}
                        fill="#dc2626"
                        opacity={0.7}
                      />
                    </g>
                  ))}
                  {/* X-axis date labels — show every 7th */}
                  {timeseries.map((d, i) => (
                    i % 7 === 0 ? (
                      <text key={d.date} x={i * (barW + 1)} y={chartH + 14} fontSize={9} fill="#9ca3af">
                        {d.date.slice(5)}
                      </text>
                    ) : null
                  ))}
                </svg>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span><span className="inline-block w-3 h-3 bg-green-600 rounded-sm mr-1" />Tâches créées</span>
                  <span><span className="inline-block w-3 h-3 bg-red-600 rounded-sm mr-1" />Incidents</span>
                </div>
              </div>
            </div>

            {/* Distribution bars */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tâches par priorité</h3>
                <div className="space-y-2">
                  {["high", "normal", "low"].map((p) => (
                    <MiniBar key={p} label={p} value={overview.tasks.byPriority[p] ?? 0} max={maxPriority} />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Incidents par sévérité</h3>
                <div className="space-y-2">
                  {["critical", "high", "medium", "low"].map((s) => (
                    <MiniBar key={s} label={s} value={overview.incidents.bySeverity[s] ?? 0} max={maxSeverity} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
