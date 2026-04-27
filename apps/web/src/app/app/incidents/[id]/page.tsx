import { incidents } from "@/mock/agri";
import { SectionCard, StatusBadge, Timeline } from "@/components/product/ui";

const workflow = ["Signale", "Analyse", "Assigne", "Traite", "Cloture"];

export default async function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const incident = incidents.find((item) => item.id === id) ?? incidents[0];

  return (
    <div className="space-y-5">
      <SectionCard
        title="Suspicion maladie foliaire - Parcelle A03"
        subtitle="Kintele · Criticite critique · Statut : En investigation"
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Creer une intervention liee</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Reassigner</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Cloturer l&apos;incident</button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 text-sm">
          <p>Ferme: <strong>{incident.farm}</strong></p>
          <p>Zone: <strong>{incident.zone}</strong></p>
          <p>Culture: <strong>Manioc</strong></p>
          <p>Signale par: <strong>{incident.reporter}</strong></p>
          <p>Date de signalement: <strong>{incident.date}</strong></p>
          <p>Criticite: <strong>{incident.criticality}</strong></p>
          <p>Statut: <StatusBadge value={incident.status} /></p>
          <p>Responsable: <strong>{incident.assignee}</strong></p>
        </div>
      </SectionCard>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Description de l'anomalie">
          <p className="text-sm text-[#4e6051]">Des signes anormaux ont ete observes sur les feuilles superieures de la parcelle A03. Les photographies jointes suggerent une degradation rapide. Une verification phytosanitaire est requise.</p>
        </SectionCard>
        <SectionCard title="Workflow">
          <Timeline items={workflow} />
        </SectionCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Photos et pieces associees">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-36 rounded-2xl bg-[linear-gradient(135deg,#9bb27f_0%,#6b8453_100%)]" />
            <div className="h-36 rounded-2xl bg-[linear-gradient(135deg,#d4936f_0%,#8b5c44_100%)]" />
          </div>
        </SectionCard>
        <SectionCard title="Suivi de traitement">
          <ul className="space-y-2 text-sm">
            <li className="rounded-xl border p-3">09:20 - Expert phytosanitaire assigne</li>
            <li className="rounded-xl border p-3">09:34 - Inspection terrain lancee</li>
            <li className="rounded-xl border p-3">09:52 - Photos complementaires demandees</li>
          </ul>
        </SectionCard>
      </section>
    </div>
  );
}
