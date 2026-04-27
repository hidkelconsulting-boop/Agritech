import { proofs } from "@/mock/agri";

const statusColors: Record<string, string> = {
  "A valider": "bg-amber-100 text-amber-700",
  "Validee": "bg-green-100 text-green-700",
  "Critique": "bg-red-100 text-red-700",
  "A verifier": "bg-slate-100 text-slate-600",
};

export default function MobilePhotosPage() {
  return (
    <div className="space-y-5 p-4">
      {/* Upload CTA */}
      <button className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#2f6a44] bg-[#f0f7f1] py-8 text-[#2f6a44]">
        <span className="text-5xl leading-none">◎</span>
        <span className="font-bold">Prendre une photo</span>
        <span className="text-sm text-[#6d8b6f]">Associer à une intervention ou un incident</span>
      </button>

      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Mes preuves envoyées</p>

      <div className="space-y-3">
        {proofs.map((proof) => (
          <div key={proof.id} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
            {/* Thumbnail placeholder */}
            <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-[#2f6a44] to-[#d7e675]" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-1">
                <p className="font-bold text-[#1f3125]">{proof.title}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[proof.status] ?? "bg-slate-100 text-slate-600"}`}>
                  {proof.status}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{proof.farm} · {proof.parcel}</p>
              <p className="mt-0.5 text-xs text-slate-400">Envoyée à {proof.hour} par {proof.author}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-slate-600">Règles photo terrain</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-500">
          <li>• Chaque intervention clôturée doit avoir au moins 1 photo</li>
          <li>• Les incidents critiques nécessitent 2 photos minimum</li>
          <li>• La localisation GPS est automatiquement enregistrée</li>
          <li>• Les photos sont validées dans les 2h par le superviseur</li>
        </ul>
      </div>
    </div>
  );
}
