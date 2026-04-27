import { farms, actionParcels, interventionsToday, incidents, proofs } from "@/mock/agri";
import { SectionCard } from "@/components/product/ui";

export default async function FarmDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const farm = farms.find((f) => f.id === id) ?? farms[0];

  return (
    <div className="space-y-5">
      <SectionCard
        title={farm.name}
        subtitle="Vue detaillee de l'exploitation, des parcelles, des equipes et des operations en cours"
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Creer une intervention</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Signaler un incident</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Ajouter une parcelle</button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 text-sm">
          <p>Surface totale: <strong>{farm.surface}</strong></p>
          <p>Parcelles actives: <strong>{farm.parcels}</strong></p>
          <p>Interventions du jour: <strong>{farm.dayInterventions}</strong></p>
          <p>Incidents ouverts: <strong>{farm.incidents}</strong></p>
          <p>Equipes presentes: <strong>{farm.teams}</strong></p>
          <p>Derniere mise a jour: <strong>{farm.lastReport}</strong></p>
        </div>
      </SectionCard>

      <SectionCard title="Onglets" subtitle="Vue generale · Parcelles · Interventions · Incidents · Equipes · Photos · Materiel · Stocks">
        <></>
      </SectionCard>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Parcelles prioritaires">
          <ul className="space-y-2 text-sm">
            {actionParcels.filter((p) => p.farm.includes(farm.name.split(" ")[0])).slice(0, 3).map((p) => <li key={p.parcel} className="rounded-xl border p-3">{p.parcel} · {p.crop} · {p.risk}</li>)}
          </ul>
        </SectionCard>
        <SectionCard title="Interventions du jour">
          <ul className="space-y-2 text-sm">
            {interventionsToday.slice(0, 4).map((i) => <li key={i.intervention} className="rounded-xl border p-3">{i.intervention} · {i.parcel} · {i.status}</li>)}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Incidents actifs">
          <ul className="space-y-2 text-sm">
            {incidents.slice(0, 3).map((i) => <li key={i.id} className="rounded-xl border p-3">{i.incident} · {i.criticality} · {i.status}</li>)}
          </ul>
        </SectionCard>
        <SectionCard title="Dernieres preuves terrain">
          <ul className="space-y-2 text-sm">
            {proofs.slice(0, 3).map((p) => <li key={p.id} className="rounded-xl border p-3">{p.title} · {p.status}</li>)}
          </ul>
        </SectionCard>
      </section>
    </div>
  );
}
