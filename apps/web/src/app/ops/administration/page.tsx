const sections = [
  'Utilisateurs',
  'Roles',
  'Permissions',
  'Fermes',
  'Types d\'intervention',
  'Categories d\'incidents',
  'Statuts',
  'Integrations',
  'Notifications',
  'Facturation',
];

export default function AdministrationPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Administration</h1>
        <p className="mt-2 text-[#506352]">Configurez les parametres de plateforme sans polluer les ecrans metier.</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((name) => (
          <article key={name} className="rounded-2xl border border-white/65 bg-white/85 p-4 shadow">
            <h2 className="font-bold">{name}</h2>
            <p className="mt-1 text-sm text-[#5f715f]">Regles, acces et configuration operationnelle.</p>
            <button className="mt-3 rounded-lg border px-3 py-1 text-sm">Ouvrir</button>
          </article>
        ))}
      </section>
    </div>
  );
}
