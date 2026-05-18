import Link from "next/link";
import { interventionsToday } from "@/mock/agri";

type SearchParams = Promise<{ id?: string; photo?: string }>;

const choices = [
  { key: "termine", label: "TERMINÉ", icon: "✅", bg: "#2f6a44", active: "#27583a" },
  { key: "refaire", label: "À REFAIRE", icon: "⏳", bg: "#d97706", active: "#b45309" },
  { key: "probleme", label: "PROBLÈME", icon: "⚠️", bg: "#dc2626", active: "#b91c1c" },
] as const;

export default async function CloturerResultatPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { id, photo } = await searchParams;
  const idx = Number(id);
  const intervention =
    Number.isInteger(idx) && idx >= 0 && idx < interventionsToday.length
      ? interventionsToday[idx]
      : undefined;

  if (!intervention) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <p className="text-lg text-[#1f3125]">Tâche introuvable.</p>
        <Link
          href="/mobile/cloturer"
          className="flex min-h-[60px] items-center justify-center rounded-2xl bg-[#2f6a44] text-xl font-bold text-white"
        >
          RETOUR
        </Link>
      </div>
    );
  }

  const qs = `id=${idx}&photo=${photo ?? "0"}`;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Étape 2 / 3
        </p>
        <p className="mt-1 text-2xl font-bold text-[#1f3125]">Comment ça s&apos;est passé ?</p>
        <p className="text-base text-slate-500">{intervention.intervention}</p>
      </div>

      {choices.map((c) => (
        <Link
          key={c.key}
          href={`/mobile/cloturer/valider?${qs}&resultat=${c.key}`}
          className="flex min-h-[80px] items-center gap-4 rounded-2xl px-6 text-white shadow-sm"
          style={{ backgroundColor: c.bg }}
        >
          <span className="text-4xl leading-none">{c.icon}</span>
          <span className="text-2xl font-bold">{c.label}</span>
        </Link>
      ))}

      <Link
        href={`/mobile/cloturer?id=${idx}`}
        className="flex min-h-[60px] items-center justify-center rounded-2xl border border-[#d0d8d0] bg-white text-xl font-bold text-[#1f3125] active:bg-[#eef2ee]"
      >
        RETOUR
      </Link>
    </div>
  );
}
