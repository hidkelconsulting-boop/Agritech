import Link from "next/link";
import { interventionsToday, priorityAlerts } from "@/mock/agri";
import type { InterventionStatus } from "@/mock/agri";

const statusPriority: Record<InterventionStatus, number> = {
  "En retard": 1,
  "En cours": 2,
  "Planifiee": 3,
  "A planifier": 4,
  "A valider": 5,
  "Terminee": 6,
};

const statusStyle: Record<InterventionStatus, { label: string; bg: string; fg: string }> = {
  "En retard": { label: "EN RETARD", bg: "#fee2e2", fg: "#b91c1c" },
  "En cours": { label: "EN COURS", bg: "#dbeafe", fg: "#1d4ed8" },
  "Planifiee": { label: "PRÉVUE", bg: "#f1f5f9", fg: "#475569" },
  "A planifier": { label: "À PRÉVOIR", bg: "#f1f5f9", fg: "#475569" },
  "A valider": { label: "À VALIDER", bg: "#fef3c7", fg: "#b45309" },
  "Terminee": { label: "TERMINÉ", bg: "#dcfce7", fg: "#15803d" },
};

export default function MobileTachesPage() {
  const myTasks = interventionsToday
    .map((t, i) => ({ ...t, idx: i }))
    .filter((t) => t.status !== "Terminee")
    .sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);

  const critiques = priorityAlerts.filter((a) => a.level === "Critique");

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
      {/* Bannière critique (élargie) */}
      {critiques.length > 0 && (
        <Link
          href="/mobile/incidents"
          className="flex min-h-[80px] items-start gap-4 rounded-2xl bg-[#fee2e2] p-4 shadow-sm active:bg-[#fecaca]"
        >
          <span className="text-4xl leading-none">⚠️</span>
          <div className="flex-1">
            <p className="text-lg font-bold text-[#b91c1c]">
              {critiques.length} problème{critiques.length > 1 ? "s" : ""} important
              {critiques.length > 1 ? "s" : ""}
            </p>
            <p className="text-base text-[#7c2d12]">Voir les problèmes</p>
          </div>
        </Link>
      )}

      <p className="text-base font-bold uppercase tracking-widest text-slate-500">
        Mes tâches du jour
      </p>

      {/* Liste tâches : 1 carte = 1 tap = 1 page guidée */}
      {myTasks.length === 0 && (
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-5xl">👍</p>
          <p className="mt-3 text-xl font-bold text-[#1f3125]">Pas de tâche à faire</p>
        </div>
      )}

      {myTasks.map((task) => {
        const s = statusStyle[task.status];
        return (
          <Link
            key={task.idx}
            href={`/mobile/tache/${task.idx}`}
            className="flex min-h-[100px] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm active:bg-[#eef2ee]"
          >
            <span className="text-5xl leading-none">{task.icone ?? "📋"}</span>
            <div className="flex-1">
              <span
                className="inline-block rounded-full px-3 py-1 text-sm font-bold"
                style={{ backgroundColor: s.bg, color: s.fg }}
              >
                {s.label}
              </span>
              <p className="mt-2 text-xl font-bold text-[#1f3125]">{task.intervention}</p>
              <p className="text-lg text-slate-500">{task.parcel}</p>
            </div>
            <span className="text-3xl leading-none text-slate-400">›</span>
          </Link>
        );
      })}
    </div>
  );
}
