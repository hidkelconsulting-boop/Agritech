const analytics = [
  ['Taux execution global', '91%'],
  ['Interventions par ferme', 'Nord: 12 | Kintele: 9 | Mbankana: 16'],
  ['Incidents par categorie', 'Sanitaire: 5 | Materiel: 4 | Irrigation: 3'],
  ['Temps moyen resolution', '3h20'],
  ['Conformite preuves photo', '94%'],
  ['Charge moyenne par equipe', '6.8 taches / jour'],
  ['Performance par culture', 'Mais: 93% | Manioc: 89% | Tomate: 86%'],
  ['Historique alertes', '24 alertes sur 7 jours'],
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Analytics et performance</h1>
        <p className="mt-2 text-[#506352]">Mesurez l&apos;execution terrain, les incidents et la performance de vos exploitations.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {analytics.map((a) => (
          <article key={a[0]} className="rounded-2xl border border-white/65 bg-white/85 p-4 shadow">
            <p className="text-sm text-[#5f715f]">{a[0]}</p>
            <p className="mt-1 text-xl font-black text-[#223628]">{a[1]}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-lg font-bold">Interventions par ferme</h2>
          <div className="mt-4 space-y-3">
            {[['Mbankana',72],['Ferme Nord',53],['Kintele',41],['Zone Sud',37]].map((b) => (
              <div key={b[0]}>
                <div className="mb-1 flex justify-between text-sm"><span>{b[0]}</span><span>{b[1]}</span></div>
                <div className="h-2 rounded-full bg-[#dde7d9]"><div className="h-2 rounded-full bg-[#2f6a44]" style={{ width: `${b[1]}%` }} /></div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-lg font-bold">Top zones en tension</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="rounded-xl border p-3">Zone Sud - Risque critique irrigation</li>
            <li className="rounded-xl border p-3">A03 Kintele - Suspicion sanitaire</li>
            <li className="rounded-xl border p-3">B12 Nord - Pression eau variable</li>
            <li className="rounded-xl border p-3">D07 Ouest - Retard intervention</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
