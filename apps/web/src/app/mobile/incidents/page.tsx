import Link from "next/link";
import { incidents } from "@/mock/agri";

const statusColors: Record<string, string> = {
  "Ouvert": "bg-red-100 text-red-700",
  "En investigation": "bg-amber-100 text-amber-700",
  "Assigne": "bg-blue-100 text-blue-700",
  "Traite": "bg-green-100 text-green-700",
  "Cloture": "bg-slate-100 text-slate-500",
};

const criticalityColors: Record<string, string> = {
  "Critique": "text-red-600",
  "Eleve": "text-amber-600",
  "Moyen": "text-slate-500",
};

export default function MobileIncidentsPage() {
  return (
    <div className="space-y-5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Incidents actifs</p>
        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">{incidents.length} ouverts</span>
      </div>

      <div className="space-y-3">
        {incidents.map((inc) => (
          <div key={inc.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className={`text-xs font-bold uppercase ${criticalityColors[inc.criticality] ?? "text-slate-500"}`}>
                  {inc.criticality}
                </p>
                <p className="mt-0.5 font-bold text-[#1f3125]">{inc.incident}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {inc.farm} · Zone {inc.zone}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {inc.category} · Signalé le {inc.date}
                </p>
                <p className="text-xs text-slate-400">Assigné à : {inc.assignee}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[inc.status] ?? "bg-slate-100 text-slate-600"}`}>
                {inc.status}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href="/mobile/photos"
                className="flex-1 rounded-xl bg-[#2f6a44] py-2.5 text-center text-sm font-semibold text-white"
              >
                Ajouter une photo
              </Link>
              <button className="flex-1 rounded-xl border border-[#d0d8d0] bg-white py-2.5 text-center text-sm font-medium text-slate-600">
                Commenter
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-[#b9cab5] bg-white p-5 text-center">
        <p className="text-3xl">⚠</p>
        <p className="mt-2 font-bold text-[#2f6a44]">Signaler un nouvel incident</p>
        <p className="mt-1 text-sm text-slate-500">Décrivez l&apos;anomalie, ajoutez une photo et localisez la parcelle.</p>
        <button className="mt-4 w-full rounded-xl bg-[#2f6a44] py-3 text-sm font-semibold text-white">
          Nouveau signalement
        </button>
      </div>
    </div>
  );
}
