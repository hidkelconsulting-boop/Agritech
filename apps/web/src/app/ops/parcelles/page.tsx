const rows = [
  ["B12", "Ferme Nord", "Mais", "4,5 ha", "Croissance", "Irrigation ce matin", "Moyen", "Equipe A", "Active"],
  ["A03", "Kintele", "Manioc", "3,1 ha", "Surveillance", "Inspection hier", "Eleve", "Superviseur 1", "Sous controle"],
  ["D07", "Zone Sud", "Tomate", "2,8 ha", "Risque", "Controle aujourd'hui", "Critique", "Equipe C", "Sous surveillance"],
];

export default function ParcellesPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Parcelles</h1>
        <p className="mt-2 text-[#506352]">Suivez l&apos;etat de chaque parcelle, son historique et les actions a mener.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-[#2f6a44] px-4 py-2 font-semibold text-white">Ajouter une parcelle</button>
          <button className="rounded-xl border px-4 py-2">Planifier une visite</button>
          <button className="rounded-xl border px-4 py-2">Creer une intervention</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <div className="mb-4 flex flex-wrap gap-2 text-sm">
          {['Ferme','Culture','Statut','Risque','Superficie','Derniere visite','Responsable'].map((f) => (
            <span key={f} className="rounded-full border px-3 py-1">{f}</span>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#dde5dc] text-[#546857]">
                {['Parcelle','Ferme','Culture','Superficie','Stade','Derniere intervention','Risque','Responsable','Statut'].map((h) => <th key={h} className="py-2 pr-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-[#edf2ea]">
                  {row.map((cell) => <td key={`${row[0]}-${cell}`} className="py-3 pr-3">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
