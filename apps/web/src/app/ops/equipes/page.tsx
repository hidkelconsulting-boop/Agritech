const teams = [
  { name: 'Equipe Irrigation 1', lead: 'M. Nguema', members: 6, farms: 2, dayTasks: 8, done: 6, late: 1, checkin: '08:42' },
  { name: 'Equipe Recolte 2', lead: 'Mme Banza', members: 5, farms: 1, dayTasks: 5, done: 5, late: 0, checkin: '09:03' },
  { name: 'Equipe Phyto', lead: 'M. Kiala', members: 4, farms: 2, dayTasks: 6, done: 4, late: 1, checkin: '08:36' },
];

export default function EquipesPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Equipes terrain</h1>
        <p className="mt-2 text-[#506352]">Suivez l&apos;activite des equipes, leur charge et leur performance operationnelle.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-[#2f6a44] px-4 py-2 font-semibold text-white">Ajouter une equipe</button>
          <button className="rounded-xl border px-4 py-2">Affectation rapide</button>
          <button className="rounded-xl border px-4 py-2">Voir la charge</button>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <article key={team.name} className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
            <h3 className="text-lg font-bold">{team.name}</h3>
            <p className="text-sm text-[#546857]">Responsable: {team.lead}</p>
            <p className="mt-2 text-sm">Membres: {team.members} · Fermes couvertes: {team.farms}</p>
            <p className="text-sm">Taches du jour: {team.dayTasks} · Terminees: {team.done} · En retard: {team.late}</p>
            <p className="text-sm">Dernier check-in: {team.checkin}</p>
            <div className="mt-3 h-2 rounded-full bg-[#dde7d9]">
              <div className="h-2 rounded-full bg-[#2f6a44]" style={{ width: `${Math.round((team.done / team.dayTasks) * 100)}%` }} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
