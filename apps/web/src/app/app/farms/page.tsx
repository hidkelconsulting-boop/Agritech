import Link from "next/link";
import { farms } from "@/mock/agri";
import { SectionCard } from "@/components/product/ui";

export default function FarmsPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Fermes et sites d'exploitation"
        subtitle="Supervisez l'ensemble de vos exploitations et identifiez rapidement les sites necessitant une action."
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Ajouter une ferme</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Exporter</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Filtrer</button>
          </>
        }
      >
        <></>
      </SectionCard>

      <SectionCard title="Filtres" subtitle="Region · Statut · Culture dominante · Responsable · Niveau d'alerte">
        <div className="flex flex-wrap gap-2 text-sm">
          {['Region','Statut','Culture dominante','Responsable','Niveau d\'alerte'].map((f) => <span key={f} className="rounded-full border px-3 py-1">{f}</span>)}
        </div>
      </SectionCard>

      <SectionCard title="Vue cartes" subtitle="Vue tableau disponible dans l&apos;iteration suivante">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {farms.map((farm) => (
            <article key={farm.id} className="rounded-2xl border border-[#e6ece3] bg-[#f8faf7] p-4">
              <h3 className="text-lg font-bold">{farm.name}</h3>
              <p className="mt-1 text-sm text-[#546857]">Surface: {farm.surface} · Parcelles: {farm.parcels}</p>
              <p className="text-sm text-[#546857]">Cultures: {farm.crops}</p>
              <p className="text-sm text-[#546857]">Equipes actives: {farm.teams} · Interventions aujourd&apos;hui: {farm.dayInterventions}</p>
              <p className="text-sm text-[#546857]">Incidents ouverts: {farm.incidents} · Dernier rapport: {farm.lastReport}</p>
              <p className="text-sm font-semibold text-[#2d4f39]">Statut: {farm.status}</p>
              <div className="mt-3 flex gap-2 text-sm">
                <Link href={`/app/farms/${farm.id}`} className="rounded-lg border px-2 py-1">Voir les details</Link>
                <Link href="/app/parcels" className="rounded-lg border px-2 py-1">Voir les parcelles</Link>
                <Link href="/app/interventions" className="rounded-lg border px-2 py-1">Voir les interventions</Link>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
