import { farmCards } from "@/lib/ops-data";

export default function FarmsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Fermes et sites d&apos;exploitation</h1>
        <p className="mt-2 text-[#506352]">Supervisez l&apos;ensemble de vos exploitations et identifiez les sites necessitant une action.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-[#2f6a44] px-4 py-2 font-semibold text-white">Ajouter une ferme</button>
          <button className="rounded-xl border px-4 py-2">Exporter la vue</button>
          <button className="rounded-xl border px-4 py-2">Filtrer</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <div className="mb-4 flex flex-wrap gap-2 text-sm">
          {['Region','Statut','Surface','Culture dominante','Incidents','Responsable'].map((f) => (
            <span key={f} className="rounded-full border px-3 py-1">{f}</span>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {farmCards.map((farm) => (
            <article key={farm.name} className="rounded-2xl border border-[#e6ece3] bg-[#f8faf7] p-4">
              <h3 className="text-lg font-bold">{farm.name}</h3>
              <p className="text-sm text-[#546857]">Responsable: {farm.manager}</p>
              <p className="text-sm text-[#546857]">Surface: {farm.surface} · Cultures: {farm.crops}</p>
              <p className="text-sm text-[#546857]">Parcelles: {farm.plots} · Equipes: {farm.teams}</p>
              <p className="text-sm text-[#546857]">Interventions ouvertes: {farm.openOps} · Incidents: {farm.incidents}</p>
              <p className="text-sm text-[#546857]">Dernier rapport: {farm.report} · Statut: {farm.status}</p>
              <div className="mt-3 flex gap-2 text-sm">
                <button className="rounded-lg border px-2 py-1">Voir details</button>
                <button className="rounded-lg border px-2 py-1">Voir parcelles</button>
                <button className="rounded-lg border px-2 py-1">Voir interventions</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
