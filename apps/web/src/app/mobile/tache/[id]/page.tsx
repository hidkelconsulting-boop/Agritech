"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { interventionsToday } from "@/mock/agri";
import { useFiches } from "@/lib/referentiel/store";
import { PhotoButton } from "./_components/PhotoButton";

const criticiteColor: Record<string, string> = {
  faible: "#6d8b6f",
  moyenne: "#d97706",
  haute: "#dc2626",
};

const criticiteLabel: Record<string, string> = {
  faible: "Tâche normale",
  moyenne: "Tâche importante",
  haute: "Tâche critique",
};

export default function TachePage() {
  const params = useParams<{ id: string }>();
  const fiches = useFiches();

  const idx = Number(params.id);
  const tache =
    Number.isInteger(idx) && idx >= 0 && idx < interventionsToday.length
      ? interventionsToday[idx]
      : undefined;

  if (!tache) {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
        <p className="text-xl text-[#1f3125]">Tâche introuvable.</p>
        <Link
          href="/mobile"
          className="flex min-h-[60px] items-center justify-center rounded-2xl bg-[#2f6a44] text-xl font-bold text-white"
        >
          RETOUR
        </Link>
      </div>
    );
  }

  // Lookup fiche référentielle liée (si l'intervention a un protocoleRefId)
  const refId = (tache as { protocoleRefId?: string }).protocoleRefId;
  const ficheLiee = refId ? fiches.find((f) => f.id === refId) : undefined;
  const ficheValideeOuvrier =
    ficheLiee && ficheLiee.statut === "valide" && ficheLiee.visibleOuvrier;

  // Règle métier : si la tâche a un protocoleRefId MAIS la fiche n'est pas validée,
  // on cache le protocole pédagogique (pas de "suggestion IA" côté ouvrier).
  // Sinon, on utilise le protocole inline (pour les tâches sans ref ou avec fiche validée).
  const masquerProtocoleInline = Boolean(refId) && !ficheValideeOuvrier;

  const protocole = masquerProtocoleInline ? undefined : tache.protocole;
  const criticite = protocole?.criticite ?? "faible";

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
      {/* Bandeau officiel si fiche validée */}
      {ficheValideeOuvrier && (
        <div className="rounded-2xl bg-[#dcfce7] p-3">
          <p className="text-sm font-bold text-[#15803d]">
            ✓ Consigne officielle de la ferme
            {ficheLiee?.testSurPetiteZone ? " · à tester sur petite zone" : ""}
          </p>
        </div>
      )}

      {/* Bandeau "pas de consigne validée" si fiche en attente */}
      {refId && !ficheValideeOuvrier && (
        <div className="rounded-2xl bg-[#fef3c7] p-3">
          <p className="text-sm font-bold text-[#b45309]">
            ⏳ Pas encore de consigne officielle pour cette tâche
          </p>
          <p className="mt-1 text-xs text-[#7c2d12]">
            Fais ta tâche normalement avec ce que tu connais. Demande à ton responsable si tu as
            un doute. Prends une photo à la fin.
          </p>
        </div>
      )}

      {/* En-tête tâche */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="text-5xl leading-none">{tache.icone ?? "📋"}</span>
          <div className="flex-1">
            {protocole && (
              <p
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: criticiteColor[criticite] }}
              >
                {criticiteLabel[criticite]}
              </p>
            )}
            <h1 className="mt-1 text-2xl font-bold text-[#1f3125]">{tache.intervention}</h1>
            <p className="mt-1 text-lg text-slate-500">{tache.parcel}</p>
          </div>
        </div>
      </div>

      {/* Pourquoi */}
      {protocole?.pourquoi && (
        <section className="rounded-2xl bg-[#f0f7f1] p-5 shadow-sm">
          <p className="text-base font-bold uppercase tracking-widest text-[#2f6a44]">
            Pourquoi
          </p>
          <p className="mt-2 text-xl leading-relaxed text-[#1f3125]">{protocole.pourquoi}</p>
        </section>
      )}

      {/* Faire (étapes) */}
      {protocole?.etapes && protocole.etapes.length > 0 && (
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-base font-bold uppercase tracking-widest text-[#2f6a44]">
            Faire
          </p>
          <ol className="mt-3 flex flex-col gap-3">
            {protocole.etapes.map((etape, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2f6a44] text-lg font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-1 text-xl leading-snug text-[#1f3125]">{etape}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Observer (signes d'alerte) */}
      {protocole?.signes && protocole.signes.length > 0 && (
        <section className="rounded-2xl bg-[#fff4e6] p-5 shadow-sm">
          <p className="text-base font-bold uppercase tracking-widest text-[#d97706]">
            Observer
          </p>
          <p className="mt-2 text-base text-[#7c2d12]">
            Si tu vois un de ces signes, appuie sur <strong>Problème</strong>.
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {protocole.signes.map((signe, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-2xl leading-none">⚠️</span>
                <span className="pt-1 text-xl leading-snug text-[#1f3125]">{signe}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pas de protocole : message minimal */}
      {!protocole && !refId && (
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-lg text-[#1f3125]">
            Va sur le terrain et fais ta tâche normalement. Prends une photo à la fin.
          </p>
        </section>
      )}

      {/* Actions */}
      <PhotoButton />

      <Link
        href={`/mobile/incidents?fromTache=${idx}`}
        className="flex min-h-[80px] items-center justify-center gap-3 rounded-2xl bg-[#dc2626] text-2xl font-bold text-white shadow-sm active:bg-[#b91c1c]"
      >
        <span className="text-3xl leading-none">⚠️</span>
        PROBLÈME
      </Link>

      <Link
        href={`/mobile/cloturer?id=${idx}`}
        className="flex min-h-[80px] items-center justify-center gap-3 rounded-2xl bg-[#2f6a44] text-2xl font-bold text-white shadow-sm active:bg-[#27583a]"
      >
        <span className="text-3xl leading-none">✅</span>
        TERMINER
      </Link>

      <Link
        href="/mobile"
        className="flex min-h-[60px] items-center justify-center rounded-2xl border border-[#d0d8d0] bg-white text-xl font-bold text-[#1f3125] active:bg-[#eef2ee]"
      >
        RETOUR
      </Link>
    </div>
  );
}
