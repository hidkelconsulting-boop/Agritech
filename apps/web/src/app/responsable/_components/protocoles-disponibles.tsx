"use client";

import Link from "next/link";
import { useFiches } from "@/lib/referentiel/store";
import {
  FILIERE_LABELS,
  TYPE_LABELS,
  type TypeFiche,
} from "@/lib/referentiel/types";

const typeIcon: Record<TypeFiche, string> = {
  ration: "🥣",
  "recette-alimentaire": "🧪",
  "protocole-sanitaire": "💉",
  fertilisation: "🌱",
  recyclage: "♻️",
  "synergie-filieres": "🔄",
  calendrier: "📅",
  "seuil-technique": "📏",
  "tache-guidee": "✓",
  alerte: "⚠️",
};

export function ProtocolesDisponibles() {
  const fiches = useFiches();
  const validees = fiches.filter(
    (f) => f.statut === "valide" && f.visibleResponsable,
  );

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-4xl leading-none">📘</span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f6a44]">
            Protocoles disponibles
          </p>
          <p className="mt-1 text-sm text-[#475569]">
            Consignes officielles validées par le propriétaire — à transformer en tâches concrètes
            sur le terrain.
          </p>
        </div>
        <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#15803d]">
          {validees.length} dispo
        </span>
      </div>

      {validees.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-[#f1f5f9] p-4 text-center">
          <p className="text-sm text-[#475569]">
            Aucun protocole officiel pour l&apos;instant. Le propriétaire doit d&apos;abord valider
            des suggestions du référentiel.
          </p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {validees.map((f) => (
            <article
              key={f.id}
              className="flex items-start gap-3 rounded-2xl border border-[#dcfce7] bg-[#f0fdf4] p-4"
            >
              <span className="text-3xl leading-none">{typeIcon[f.type]}</span>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[#15803d]">
                  {TYPE_LABELS[f.type]} · {FILIERE_LABELS[f.filiere]}
                </p>
                <p className="mt-1 text-base font-bold text-[#1f2937]">{f.titre}</p>
                <p className="mt-1 text-sm text-[#475569]">{f.description}</p>
                {f.testSurPetiteZone && (
                  <p className="mt-1 text-xs font-bold text-[#b45309]">
                    ⚠️ Validée en test sur petite zone — ne pas généraliser sans accord
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="rounded-full bg-[#dcfce7] px-2 py-1 text-xs font-bold text-[#15803d]">
                  Officiel
                </span>
                {f.visibleOuvrier && (
                  <span className="text-xs font-semibold text-[#2f6a44]">→ ouvrier</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
