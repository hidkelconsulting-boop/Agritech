const equipment = [
  ['Pompe station Sud', 'Pompe', 'Zone Sud', 'Hors service', '02/04', '05/04', '2', 'Critique'],
  ['Capteur humidite A3', 'Capteur', 'Ferme Nord', 'Instable', '01/04', '10/04', '1', 'A surveiller'],
  ['Tracteur 02', 'Engin', 'Mbankana', 'Operationnel', '28/03', '28/04', '0', 'Normal'],
  ['Groupe electrogene Nord', 'Energie', 'Ferme Nord', 'Maintenance', '03/04', '12/04', '1', 'A surveiller'],
];

export default function MaterielPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Materiel et equipements</h1>
        <p className="mt-2 text-[#506352]">Gardez le controle sur les actifs terrain, la maintenance et les indisponibilites.</p>
      </section>
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#dde5dc] text-[#546857]">
              {['Equipement','Type','Ferme','Etat','Derniere maintenance','Prochaine maintenance','Incidents lies','Statut'].map((h) => <th key={h} className="py-2 pr-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {equipment.map((row) => (
              <tr key={row[0]} className="border-b border-[#edf2ea]">{row.map((cell) => <td key={`${row[0]}-${cell}`} className="py-3 pr-3">{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
