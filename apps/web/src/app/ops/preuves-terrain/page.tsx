const proofs = [
  ['Photo irrigation', 'Ferme Nord', 'B12', 'Irrigation', 'Equipe A', '08:47', 'Validee'],
  ['Photo maladie foliaire', 'Kintele', 'A03', 'Inspection', 'Superviseur 1', '08:39', 'A verifier'],
  ['Photo recolte', 'Mbankana', 'D04', 'Recolte', 'Equipe Recolte 2', '07:12', 'Validee'],
  ['Photo panne pompe', 'Zone Sud', 'S2', 'Maintenance', 'Maintenance', '06:58', 'Rejetee'],
];

export default function ProofsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Preuves terrain</h1>
        <p className="mt-2 text-[#506352]">Centralisez les photos, commentaires et validations lies aux operations de terrain.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-[#2f6a44] px-4 py-2 font-semibold text-white">Uploader</button>
          <button className="rounded-xl border px-4 py-2">Filtrer</button>
          <button className="rounded-xl border px-4 py-2">Voir les non validees</button>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {proofs.map((p) => (
          <article key={`${p[0]}-${p[5]}`} className="rounded-2xl border border-white/65 bg-white/85 p-3 shadow">
            <div className="h-24 rounded-xl bg-[linear-gradient(135deg,#9bb27f_0%,#6b8453_100%)]" />
            <p className="mt-2 font-semibold">{p[0]}</p>
            <p className="text-xs text-[#5f715f]">{p[1]} · {p[2]} · {p[3]}</p>
            <p className="text-xs text-[#5f715f]">{p[4]} · {p[5]}</p>
            <p className="mt-1 text-xs font-semibold">{p[6]}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
