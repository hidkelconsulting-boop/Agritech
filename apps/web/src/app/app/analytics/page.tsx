import { DataTable, KpiCard, SectionCard } from "@/components/product/ui";

export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Analytics et performance"
        subtitle="Mesurez l'execution terrain, les incidents et la performance de vos exploitations."
        actions={
          <>
            <button className="rounded-xl border px-4 py-2 text-sm">Exporter</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Comparer les fermes</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Changer la periode</button>
          </>
        }
      >
        <></>
      </SectionCard>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Taux d'execution global" value="91%" subtext="7 derniers jours" />
        <KpiCard label="Temps moyen de resolution" value="3h20" subtext="incidents ouverts et traites" />
        <KpiCard label="Incidents critiques ce mois" value="14" subtext="+2 vs mois precedent" />
        <KpiCard label="Taux de conformite des preuves" value="94%" subtext="preuves valides" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {["Interventions par ferme", "Incidents par categorie", "Evolution hebdomadaire des alertes", "Repartition des taches par statut"].map((title) => (
          <SectionCard key={title} title={title}>
            <div className="h-52 rounded-2xl bg-[linear-gradient(135deg,#e6eddc_0%,#d4e0ce_100%)]" />
          </SectionCard>
        ))}
      </section>

      <SectionCard title="Fermes les plus exposees">
        <DataTable
          headers={["Ferme", "Incidents", "Parcelles a risque", "Temps moyen de resolution", "Taux d'execution"]}
          rows={[
            ["Kintele", "8", "6", "4h05", "84%"],
            ["Ferme Nord", "5", "4", "3h12", "90%"],
            ["Mbankana", "3", "2", "2h44", "93%"],
          ]}
        />
      </SectionCard>
    </div>
  );
}
