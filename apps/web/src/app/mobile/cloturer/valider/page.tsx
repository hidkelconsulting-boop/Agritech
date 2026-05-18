import Link from "next/link";
import { interventionsToday } from "@/mock/agri";

type SearchParams = Promise<{ id?: string; photo?: string; resultat?: string }>;

const resultLabels: Record<string, { label: string; icon: string; color: string }> = {
  termine: { label: "Terminé", icon: "✅", color: "#2f6a44" },
  refaire: { label: "À refaire", icon: "⏳", color: "#d97706" },
  probleme: { label: "Problème", icon: "⚠️", color: "#dc2626" },
};

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}h${String(d.getMinutes()).padStart(2, "0")}`;
}

export default async function CloturerValiderPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { id, photo, resultat } = await searchParams;
  const idx = Number(id);
  const intervention =
    Number.isInteger(idx) && idx >= 0 && idx < interventionsToday.length
      ? interventionsToday[idx]
      : undefined;
  const r = resultat && resultLabels[resultat] ? resultLabels[resultat] : undefined;

  if (!intervention || !r) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <p className="text-lg text-[#1f3125]">Information manquante.</p>
        <Link
          href="/mobile/cloturer"
          className="flex min-h-[60px] items-center justify-center rounded-2xl bg-[#2f6a44] text-xl font-bold text-white"
        >
          RETOUR
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Étape 3 / 3
        </p>
        <p className="mt-1 text-2xl font-bold text-[#1f3125]">{intervention.intervention}</p>
        <p className="text-base text-slate-500">{intervention.parcel}</p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex min-h-[60px] items-center gap-4">
          <span className="text-4xl leading-none">{r.icon}</span>
          <span className="text-2xl font-bold" style={{ color: r.color }}>
            {r.label}
          </span>
        </div>
        <div className="flex min-h-[44px] items-center gap-4">
          <span className="text-3xl leading-none">📷</span>
          <span className="text-xl text-[#1f3125]">
            {photo === "1" ? "1 photo" : "Pas de photo"}
          </span>
        </div>
        <div className="flex min-h-[44px] items-center gap-4">
          <span className="text-3xl leading-none">🕜</span>
          <span className="text-xl text-[#1f3125]">{nowHHMM()}</span>
        </div>
      </div>

      <Link
        href="/mobile?valide=1"
        className="flex min-h-[80px] items-center justify-center rounded-2xl bg-[#2f6a44] text-2xl font-bold text-white shadow-sm active:bg-[#27583a]"
      >
        VALIDER
      </Link>

      <Link
        href={`/mobile/cloturer/resultat?id=${idx}&photo=${photo ?? "0"}`}
        className="flex min-h-[60px] items-center justify-center rounded-2xl border border-[#d0d8d0] bg-white text-xl font-bold text-[#1f3125] active:bg-[#eef2ee]"
      >
        RETOUR
      </Link>
    </div>
  );
}
