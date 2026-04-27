import { SectionCard, Timeline } from "@/components/product/ui";
import { timeline } from "@/mock/agri";

export default async function ParcelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-5">
      <SectionCard
        title={`Parcelle ${id.toUpperCase()}`}
        subtitle="Ferme Nord · Culture : Mais · Surface : 4,5 ha"
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Creer une intervention</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Ajouter une observation</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Voir l&apos;historique</button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 text-sm">
          <p>Derniere visite: <strong>Aujourd&apos;hui 07:55</strong></p>
          <p>Derniere irrigation: <strong>Aujourd&apos;hui 08:30</strong></p>
          <p>Dernier traitement: <strong>02/04 11:45</strong></p>
          <p>Niveau de risque: <strong>Moyen</strong></p>
          <p>Responsable: <strong>Equipe A</strong></p>
          <p>Statut: <strong>Active</strong></p>
        </div>
      </SectionCard>

      <SectionCard title="Onglets" subtitle="Resume · Historique · Interventions · Incidents · Photos · Observations">
        <></>
      </SectionCard>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Resume">
          <ul className="space-y-2 text-sm">
            <li className="rounded-xl border p-3">Culture actuelle: Mais</li>
            <li className="rounded-xl border p-3">Date de semis: 12/03</li>
            <li className="rounded-xl border p-3">Derniere inspection: 04/04 16:10</li>
            <li className="rounded-xl border p-3">Derniere irrigation: 05/04 08:30</li>
            <li className="rounded-xl border p-3">Dernier traitement: 02/04 11:45</li>
            <li className="rounded-xl border p-3">Score de risque: 68/100</li>
            <li className="rounded-xl border p-3">Responsable terrain: Equipe A</li>
          </ul>
        </SectionCard>
        <SectionCard title="Historique">
          <Timeline items={timeline} />
        </SectionCard>
      </section>
    </div>
  );
}
