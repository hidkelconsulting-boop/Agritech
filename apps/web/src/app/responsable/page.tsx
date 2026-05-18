import { incidents, interventionsToday, priorityAlerts, proofs, teams } from "@/mock/agri";
import type { IncidentStatus, RiskLevel } from "@/mock/agri";
import { ProtocolesDisponibles } from "./_components/protocoles-disponibles";

const riskWeight: Record<RiskLevel, number> = {
  Critique: 1,
  Eleve: 2,
  Moyen: 3,
};

const incidentSeverityOrder: Record<string, number> = {
  Critique: 1,
  Eleve: 2,
  Moyen: 3,
};

type SectionProps = {
  emoji: string;
  titre: string;
  sousTitre: string;
  accent: string;
  children: React.ReactNode;
};

function Section({ emoji, titre, sousTitre, accent, children }: SectionProps) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="text-4xl leading-none">{emoji}</span>
        <div className="flex-1">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {titre}
          </p>
          <p className="mt-1 text-sm text-[#475569]">{sousTitre}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Row({
  primary,
  meta,
  pill,
  pillBg,
  pillFg,
}: {
  primary: string;
  meta: string;
  pill: string;
  pillBg: string;
  pillFg: string;
}) {
  return (
    <article className="flex items-start gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
      <div className="flex-1">
        <p className="text-base font-bold text-[#1f2937]">{primary}</p>
        <p className="mt-1 text-sm text-[#475569]">{meta}</p>
      </div>
      <span
        className="shrink-0 rounded-full px-3 py-1 text-xs font-bold"
        style={{ backgroundColor: pillBg, color: pillFg }}
      >
        {pill}
      </span>
    </article>
  );
}

function Empty({ message }: { message: string }) {
  return (
    <p className="rounded-2xl bg-[#f1f5f9] p-4 text-center text-sm text-[#475569]">
      {message}
    </p>
  );
}

export default function ResponsableHomePage() {
  // 1. À faire maintenant : incidents non clôturés (tri par criticité) + tâches en retard
  const incidentsActifs = incidents
    .filter((i) => i.status !== ("Cloture" as IncidentStatus))
    .sort(
      (a, b) =>
        (incidentSeverityOrder[a.criticality] ?? 9) -
        (incidentSeverityOrder[b.criticality] ?? 9),
    )
    .slice(0, 4);

  const tachesEnRetard = interventionsToday
    .filter((t) => t.status === "En retard")
    .slice(0, 3);

  // 2. Photos à valider
  const photosAValider = proofs.filter((p) => p.status === "A valider").slice(0, 5);

  // 3. Équipes en retard (taux < 70%)
  const equipesEnRetard = teams
    .filter((t) => parseInt(t.rate, 10) < 70)
    .sort((a, b) => parseInt(a.rate, 10) - parseInt(b.rate, 10));

  // 4. À remonter au propriétaire : top alertes critiques + équipes très en retard
  const aRemonter: { primary: string; meta: string }[] = [];
  const alertesCritiques = priorityAlerts
    .filter((a) => a.level === ("Critique" as RiskLevel))
    .sort((a, b) => riskWeight[a.level] - riskWeight[b.level])
    .slice(0, 2);
  for (const a of alertesCritiques) {
    aRemonter.push({ primary: a.title, meta: `${a.farm} · ${a.zone}` });
  }
  if (equipesEnRetard.length >= 2) {
    aRemonter.push({
      primary: `${equipesEnRetard.length} équipes sous 70% de complétion`,
      meta: equipesEnRetard
        .slice(0, 3)
        .map((t) => `${t.name} (${t.rate})`)
        .join(" · "),
    });
  }
  if (photosAValider.length >= 5) {
    aRemonter.push({
      primary: `${photosAValider.length} preuves photo en attente`,
      meta: "Délai cible : moins de 2h après la prise",
    });
  }

  return (
    <>
      <ProtocolesDisponibles />

      <Section
        emoji="🔥"
        titre="À faire maintenant"
        sousTitre="Incidents non clôturés et tâches en retard, par priorité"
        accent="#dc2626"
      >
        {incidentsActifs.length === 0 && tachesEnRetard.length === 0 && (
          <Empty message="Aucune urgence — bonne journée." />
        )}
        {incidentsActifs.map((i) => {
          const isCrit = i.criticality === "Critique";
          return (
            <Row
              key={i.id}
              primary={i.incident}
              meta={`${i.farm} · ${i.zone} · Assigné à ${i.assignee}`}
              pill={i.criticality.toUpperCase()}
              pillBg={isCrit ? "#fee2e2" : i.criticality === "Eleve" ? "#fef3c7" : "#f1f5f9"}
              pillFg={isCrit ? "#b91c1c" : i.criticality === "Eleve" ? "#b45309" : "#475569"}
            />
          );
        })}
        {tachesEnRetard.map((t, i) => (
          <Row
            key={`task-${i}`}
            primary={t.intervention}
            meta={`${t.parcel} · prévu à ${t.hour} · ${t.team}`}
            pill="EN RETARD"
            pillBg="#fee2e2"
            pillFg="#b91c1c"
          />
        ))}
      </Section>

      <Section
        emoji="📸"
        titre="Photos à valider"
        sousTitre="Preuves remontées par les équipes — délai cible 2h"
        accent="#b45309"
      >
        {photosAValider.length === 0 && <Empty message="Aucune photo en attente." />}
        {photosAValider.map((p) => (
          <Row
            key={p.id}
            primary={p.title}
            meta={`${p.farm} · ${p.parcel} · envoyée à ${p.hour} par ${p.author}`}
            pill="À VALIDER"
            pillBg="#fef3c7"
            pillFg="#b45309"
          />
        ))}
      </Section>

      <Section
        emoji="🏃"
        titre="Équipes en retard"
        sousTitre="Taux de complétion sous 70% — appel ou visite recommandé"
        accent="#1d4ed8"
      >
        {equipesEnRetard.length === 0 && (
          <Empty message="Toutes les équipes sont au-dessus de 70%." />
        )}
        {equipesEnRetard.map((t) => (
          <Row
            key={t.id}
            primary={t.name}
            meta={`Responsable : ${t.lead} · ${t.done}/${t.assigned} tâches · dernier check-in ${t.lastCheckin}`}
            pill={t.rate}
            pillBg="#dbeafe"
            pillFg="#1d4ed8"
          />
        ))}
      </Section>

      <Section
        emoji="💬"
        titre="À remonter au propriétaire"
        sousTitre="Synthèse pour la décision stratégique du jour"
        accent="#7c3aed"
      >
        {aRemonter.length === 0 && (
          <Empty message="Rien de stratégique à remonter aujourd'hui." />
        )}
        {aRemonter.map((r, i) => (
          <Row
            key={i}
            primary={r.primary}
            meta={r.meta}
            pill="À REMONTER"
            pillBg="#ede9fe"
            pillFg="#7c3aed"
          />
        ))}
      </Section>
    </>
  );
}
