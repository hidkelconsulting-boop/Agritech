import Link from "next/link";
import { interventionsToday } from "@/mock/agri";
import { DataTable, KanbanColumn, PriorityBadge, SectionCard, StatusBadge } from "@/components/product/ui";

const kanban = {
  "A planifier": ["Inspection phytosanitaire", "Nettoyage station Nord"],
  Planifiees: ["Fertilisation ciblee", "Controle humidite C4"],
  "En cours": ["Irrigation de routine", "Traitement parcelle A03"],
  "A valider": ["Recolte mais D04"],
  Terminees: ["Semis B7"],
  "En retard": ["Maintenance pompe Z01"],
};

export default function InterventionsPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Interventions terrain"
        subtitle="Planifiez, affectez, suivez et cloturez toutes les operations agricoles."
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Nouvelle intervention</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Affectation rapide</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Vue calendrier</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Exporter</button>
          </>
        }
      >
        <div className="flex flex-wrap gap-2 text-sm">
          {['Liste','Calendrier','Kanban','Par equipe'].map((tab) => <span key={tab} className={`rounded-full border px-3 py-1 ${tab === 'Liste' ? 'bg-[#d7e675] font-bold text-[#20341f]' : ''}`}>{tab}</span>)}
        </div>
      </SectionCard>

      <SectionCard title="Vue liste">
        <DataTable
          headers={["Intervention", "Ferme", "Parcelle", "Type", "Assignee a", "Debut prevu", "Priorite", "Statut", "Detail"]}
          rows={interventionsToday.map((row, idx) => [
            row.intervention,
            row.farm,
            row.parcel,
            row.intervention.split(" ")[0],
            row.team,
            row.hour,
            <PriorityBadge key={`prio-${idx}`} value={idx === 0 ? "Haute" : idx === 3 ? "Critique" : "Moyenne"} />,
            <StatusBadge key={`status-${idx}`} value={row.status} />,
            <Link key={`detail-${idx}`} href={`/app/interventions/${idx + 1}`} className="rounded border px-2 py-1 text-xs">Ouvrir</Link>,
          ])}
        />
      </SectionCard>

      <SectionCard title="Vue Kanban">
        <div className="grid gap-3 xl:grid-cols-6">
          {Object.entries(kanban).map(([title, cards]) => <KanbanColumn key={title} title={title} cards={cards} />)}
        </div>
      </SectionCard>
    </div>
  );
}
