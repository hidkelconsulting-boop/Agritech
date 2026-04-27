const kanban = {
  'A planifier': ['Inspection irrigation A3', 'Maintenance capteur D4'],
  Planifiees: ['Fertilisation bloc C1', 'Nettoyage station Nord'],
  'En cours': ['Irrigation B12', 'Traitement parcelle A03'],
  'A valider': ['Recolte D04'],
  Terminees: ['Semis B7'],
  'En retard': ['Maintenance pompe Sud'],
};

export default function InterventionsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Interventions terrain</h1>
        <p className="mt-2 text-[#506352]">Planifiez, affectez, suivez et cloturez toutes les operations agricoles.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-[#2f6a44] px-4 py-2 font-semibold text-white">Nouvelle intervention</button>
          <button className="rounded-xl border px-4 py-2">Affectation rapide</button>
          <button className="rounded-xl border px-4 py-2">Vue calendrier</button>
          <button className="rounded-xl border px-4 py-2">Exporter</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <div className="mb-4 flex flex-wrap gap-2 text-sm">
          {['Liste','Calendrier','Kanban','Par equipe'].map((m) => (
            <span key={m} className={`rounded-full border px-3 py-1 ${m === 'Kanban' ? 'bg-[#d7e675] font-bold text-[#20341f]' : ''}`}>{m}</span>
          ))}
        </div>
        <div className="grid gap-3 xl:grid-cols-6">
          {Object.entries(kanban).map(([column, cards]) => (
            <article key={column} className="rounded-2xl border border-[#e6ece3] bg-[#f8faf7] p-3">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#425746]">{column}</h2>
              <div className="mt-3 space-y-2">
                {cards.map((card) => (
                  <div key={card} className="rounded-xl border border-[#dde7d9] bg-white p-3 text-sm">
                    <p className="font-semibold">{card}</p>
                    <p className="mt-1 text-xs text-[#5c6f5d]">Ferme Nord · Priorite haute</p>
                    <div className="mt-2 flex gap-1 text-[11px]">
                      <button className="rounded border px-2 py-0.5">Ouvrir</button>
                      <button className="rounded border px-2 py-0.5">Reassigner</button>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
