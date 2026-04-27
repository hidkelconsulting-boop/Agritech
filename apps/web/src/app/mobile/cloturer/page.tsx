import { interventionsToday } from "@/mock/agri";

const checklist = [
  "Zone sécurisée et matériel vérifié",
  "Intervention effectuée selon les consignes",
  "Observations terrain notées",
  "Photo(s) de preuve jointe(s)",
  "Équipement rangé et zone nettoyée",
  "Rapport transmis au superviseur",
];

export default function MobileCloturerPage() {
  const activeInterventions = interventionsToday.filter(
    (t) => t.status === "En cours" || t.status === "A valider",
  );

  return (
    <div className="space-y-5 p-4">
      <div className="rounded-2xl bg-[#f0f7f1] px-4 py-3">
        <p className="text-sm font-semibold text-[#2f6a44]">Clôturer une intervention</p>
        <p className="mt-0.5 text-xs text-[#6d8b6f]">
          Remplissez ce formulaire après avoir réalisé votre tâche terrain.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
        {/* Intervention selector */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Intervention*</label>
          <select className="w-full rounded-xl border border-[#d0d8d0] bg-[#f8faf8] px-3 py-3 text-sm text-[#1f3125]">
            <option value="">— Sélectionner —</option>
            {activeInterventions.map((t, i) => (
              <option key={i} value={i}>
                {t.intervention} · {t.parcel} · {t.hour}
              </option>
            ))}
          </select>
        </div>

        {/* Heure de fin */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Heure de fin*</label>
          <input
            type="time"
            defaultValue="09:30"
            className="w-full rounded-xl border border-[#d0d8d0] bg-[#f8faf8] px-3 py-3 text-sm text-[#1f3125]"
          />
        </div>

        {/* Résultat */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Résultat observé*</label>
          <select className="w-full rounded-xl border border-[#d0d8d0] bg-[#f8faf8] px-3 py-3 text-sm text-[#1f3125]">
            <option>Complète — conforme</option>
            <option>Partielle — à reprendre</option>
            <option>Problème détecté</option>
            <option>Intervention annulée</option>
          </select>
        </div>

        {/* Note terrain */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Note terrain</label>
          <textarea
            rows={3}
            placeholder="Observations, anomalies, points d'attention..."
            className="w-full resize-none rounded-xl border border-[#d0d8d0] bg-[#f8faf8] px-3 py-3 text-sm text-[#1f3125] placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Checklist de clôture</p>
        <div className="mt-2 space-y-2">
          {checklist.map((item, i) => (
            <label key={i} className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#2f6a44]"
              />
              <span className="text-sm text-[#1f3125]">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Photo proof */}
      <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#2f6a44] bg-[#f0f7f1] py-6 text-[#2f6a44]">
        <span className="text-2xl leading-none">◎</span>
        <span className="font-semibold">Joindre une photo de preuve</span>
      </button>

      {/* Submit */}
      <button className="w-full rounded-2xl bg-[#2f6a44] py-4 text-base font-black text-white shadow">
        Valider la clôture
      </button>

      <p className="pb-2 text-center text-xs text-slate-400">
        La clôture sera transmise au superviseur pour validation.
      </p>
    </div>
  );
}
