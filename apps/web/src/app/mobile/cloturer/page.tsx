import Link from "next/link";
import { interventionsToday } from "@/mock/agri";
import { PhotoCapture } from "./_components/PhotoCapture";

type SearchParams = Promise<{ id?: string }>;

export default async function CloturerPhotoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { id } = await searchParams;
  const idx = Number(id);
  const intervention =
    Number.isInteger(idx) && idx >= 0 && idx < interventionsToday.length
      ? interventionsToday[idx]
      : undefined;

  if (!intervention) {
    const active = interventionsToday
      .map((t, i) => ({ ...t, i }))
      .filter((t) => t.status === "En cours" || t.status === "A valider");

    return (
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl font-bold text-[#1f3125]">Choisir la tâche à terminer</h1>
        {active.map((t) => (
          <Link
            key={t.i}
            href={`/mobile/cloturer?id=${t.i}`}
            className="flex min-h-[80px] items-center gap-4 rounded-2xl bg-white p-5 shadow-sm active:bg-[#eef2ee]"
          >
            <span className="text-4xl leading-none">{t.icone ?? "📋"}</span>
            <div className="flex-1">
              <p className="text-lg font-bold text-[#1f3125]">{t.intervention}</p>
              <p className="text-base text-slate-500">{t.parcel}</p>
            </div>
          </Link>
        ))}
        <Link
          href="/mobile"
          className="mt-2 flex min-h-[60px] items-center justify-center rounded-2xl border border-[#d0d8d0] bg-white text-xl font-bold text-[#1f3125] active:bg-[#eef2ee]"
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
          Étape 1 / 3
        </p>
        <p className="mt-1 text-2xl font-bold text-[#1f3125]">{intervention.intervention}</p>
        <p className="text-base text-slate-500">{intervention.parcel}</p>
      </div>

      <PhotoCapture nextHref={`/mobile/cloturer/resultat?id=${idx}&photo=1`} />

      <Link
        href="/mobile"
        className="flex min-h-[60px] items-center justify-center rounded-2xl border border-[#d0d8d0] bg-white text-xl font-bold text-[#1f3125] active:bg-[#eef2ee]"
      >
        RETOUR
      </Link>
    </div>
  );
}
