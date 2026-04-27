import Link from "next/link";
import { incidents } from "@/mock/agri";
import { DataTable, SectionCard, StatusBadge } from "@/components/product/ui";

export default function IncidentsPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Incidents et alertes"
        subtitle="Centralisez les anomalies, qualifiez les risques et assurez le suivi correctif."
        actions={
          <>
            <button className="rounded-xl bg-[#8a3127] px-4 py-2 text-sm font-semibold text-white">Signaler un incident</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Voir les critiques</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Exporter</button>
          </>
        }
      >
        <div className="flex flex-wrap gap-2 text-sm">
          {['Ferme','Categorie','Criticite','Statut','Date','Assigne a'].map((f) => <span key={f} className="rounded-full border px-3 py-1">{f}</span>)}
        </div>
      </SectionCard>

      <SectionCard title="Incidents recents">
        <DataTable
          headers={["Incident", "Ferme", "Zone", "Categorie", "Criticite", "Signale par", "Date", "Statut", "Assigne a", "Detail"]}
          rows={incidents.map((row) => [
            row.incident,
            row.farm,
            row.zone,
            row.category,
            row.criticality,
            row.reporter,
            row.date,
            <StatusBadge key={`status-${row.id}`} value={row.status} />,
            row.assignee,
            <Link key={`detail-${row.id}`} href={`/app/incidents/${row.id}`} className="rounded border px-2 py-1 text-xs">Ouvrir</Link>,
          ])}
        />
      </SectionCard>
    </div>
  );
}
