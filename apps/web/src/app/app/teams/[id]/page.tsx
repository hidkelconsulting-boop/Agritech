import { teams } from "@/mock/agri";
import { SectionCard } from "@/components/product/ui";

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = teams.find((item) => item.id === id) ?? teams[0];
  return (
    <div className="space-y-5">
      <SectionCard title={team.name} subtitle={`Responsable : ${team.lead} · Fermes couvertes : ${team.farmsCovered}`}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 text-sm">
          <p>Membres: <strong>{team.members}</strong></p>
          <p>Taches du jour: <strong>{team.assigned}</strong></p>
          <p>Terminees: <strong>{team.done}</strong></p>
          <p>En retard: <strong>{team.late}</strong></p>
          <p>Taux d&apos;execution: <strong>{team.rate}</strong></p>
          <p>Dernier check-in: <strong>{team.lastCheckin}</strong></p>
        </div>
      </SectionCard>
      <SectionCard title="Onglets" subtitle="Resume · Membres · Planning · Interventions · Performance">
        <></>
      </SectionCard>
    </div>
  );
}
