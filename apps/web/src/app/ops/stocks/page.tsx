const stocks = [
  ['Engrais NPK', 'Engrais', '420', '300', 'kg', 'Mbankana', '03/04', 'Normal'],
  ['Semences mais', 'Semences', '150', '120', 'sacs', 'Ferme Nord', '04/04', 'A surveiller'],
  ['Produit phyto X3', 'Phytosanitaire', '24', '20', 'litres', 'Kintele', '02/04', 'A surveiller'],
  ['Carburant diesel', 'Carburant', '180', '200', 'litres', 'Zone Sud', '04/04', 'Rupture imminente'],
];

export default function StocksPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Stocks et intrants</h1>
        <p className="mt-2 text-[#506352]">Anticipez les ruptures et suivez les consommations par ferme et par culture.</p>
      </section>
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#dde5dc] text-[#546857]">
              {['Article','Categorie','Stock actuel','Seuil minimum','Unite','Ferme','Derniere sortie','Statut'].map((h) => <th key={h} className="py-2 pr-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {stocks.map((row) => (
              <tr key={row[0]} className="border-b border-[#edf2ea]">{row.map((cell) => <td key={`${row[0]}-${cell}`} className="py-3 pr-3">{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
