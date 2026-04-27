import { incidentRows } from "@/lib/ops-data";

export default function IncidentsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h1 className="text-3xl font-black">Incidents et alertes</h1>
        <p className="mt-2 text-[#506352]">Centralisez les anomalies, qualifiez les risques et assurez le suivi correctif.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-[#8a3127] px-4 py-2 font-semibold text-white">Signaler un incident</button>
          <button className="rounded-xl border px-4 py-2">Filtrer</button>
          <button className="rounded-xl border px-4 py-2">Exporter</button>
          <button className="rounded-xl border px-4 py-2">Voir incidents critiques</button>
        </div>
      </section>

      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#dde5dc] text-[#546857]">
              {['Incident','Ferme','Zone','Categorie','Criticite','Signale par','Date','Statut','Assigne a'].map((h) => <th key={h} className="py-2 pr-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {incidentRows.map((row) => (
              <tr key={row.incident} className="border-b border-[#edf2ea]">
                <td className="py-3 pr-3 font-semibold">{row.incident}</td>
                <td className="py-3 pr-3">{row.farm}</td>
                <td className="py-3 pr-3">{row.zone}</td>
                <td className="py-3 pr-3">{row.category}</td>
                <td className="py-3 pr-3">{row.criticality}</td>
                <td className="py-3 pr-3">{row.reporter}</td>
                <td className="py-3 pr-3">{row.date}</td>
                <td className="py-3 pr-3">{row.status}</td>
                <td className="py-3 pr-3">{row.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
