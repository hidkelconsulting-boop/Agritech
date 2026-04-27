import Link from "next/link";
import { interventionsToday, priorityAlerts } from "@/mock/agri";

const statusColors: Record<string, string> = {
  "En cours": "bg-blue-100 text-blue-700",
  "Planifiee": "bg-amber-100 text-amber-700",
  "En retard": "bg-red-100 text-red-700",
  "Terminee": "bg-green-100 text-green-700",
  "A planifier": "bg-slate-100 text-slate-600",
  "A valider": "bg-purple-100 text-purple-700",
};

export default function MobileTachesPage() {
  const myTasks = interventionsToday.filter((t) => t.team === "Equipe Irrigation 1" || t.status === "En retard" || t.status === "En cours");

  return (
    <div className="space-y-5 p-4">
      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
          <p className="text-2xl font-black text-[#2f6a44]">{myTasks.length}</p>
          <p className="mt-0.5 text-xs text-slate-500">Mes tâches</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
          <p className="text-2xl font-black text-blue-600">
            {myTasks.filter((t) => t.status === "En cours").length}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">En cours</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
          <p className="text-2xl font-black text-red-500">
            {myTasks.filter((t) => t.status === "En retard").length}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">En retard</p>
        </div>
      </div>

      {/* Alert banner */}
      {priorityAlerts.filter((a) => a.level === "Critique").length > 0 && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="font-bold">⚠ {priorityAlerts.filter((a) => a.level === "Critique").length} alerte(s) critique(s)</span> sur votre zone — vérifiez les incidents.
        </div>
      )}

      {/* Task list */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Mes interventions du jour</p>
        <div className="space-y-3">
          {interventionsToday.map((task, i) => (
            <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-bold text-[#1f3125]">{task.intervention}</p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {task.farm} · {task.parcel} · {task.hour}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{task.team}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[task.status] ?? "bg-slate-100 text-slate-600"}`}>
                  {task.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Link
                  href="/mobile/cloturer"
                  className="flex-1 rounded-xl bg-[#2f6a44] py-2.5 text-center text-sm font-semibold text-white"
                >
                  Clôturer
                </Link>
                <button className="flex-1 rounded-xl border border-[#d0d8d0] bg-white py-2.5 text-center text-sm font-medium text-slate-600">
                  Reporter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
