import Link from "next/link";
import { actionParcels } from "@/mock/agri";
import { DataTable, RiskBadge, SectionCard } from "@/components/product/ui";

const rows = [
  ["B12", "Ferme Nord", "Mais", "4,5 ha", "Croissance", "Irrigation ce matin", "Moyen", "Equipe A", "Active"],
  ["A03", "Kintele", "Manioc", "3,1 ha", "Surveillance", "Inspection hier", "Eleve", "Superviseur Est", "Sous controle"],
  ["D07", "Zone Sud", "Tomate", "2,8 ha", "Stress hydrique", "Visite ce matin", "Critique", "Equipe Eau", "A traiter"],
  ["C08", "Mbankana", "Canne a sucre", "5,2 ha", "Developpement", "Fertilisation hier", "Moyen", "Equipe Sol 1", "Active"],
];

export default function ParcelsPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Parcelles"
        subtitle="Suivez l'etat de chaque parcelle, son historique et les actions a mener."
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Ajouter une parcelle</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Planifier une visite</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Creer une intervention</button>
          </>
        }
      >
        <div className="flex flex-wrap gap-2 text-sm">
          {['Ferme','Culture','Niveau de risque','Responsable','Derniere visite','Statut'].map((f) => <span key={f} className="rounded-full border px-3 py-1">{f}</span>)}
        </div>
      </SectionCard>

      <SectionCard title="Parcelles suivies">
        <DataTable
          headers={["Parcelle", "Ferme", "Culture", "Superficie", "Stade", "Derniere intervention", "Risque", "Responsable", "Statut", "Detail"]}
          rows={rows.map((r) => [r[0], r[1], r[2], r[3], r[4], r[5], <RiskBadge key={`risk-${r[0]}`} value={r[6]} />, r[7], r[8], <Link key={`link-${r[0]}`} href={`/app/parcels/${r[0].toLowerCase()}`} className="rounded border px-2 py-1 text-xs">Ouvrir</Link>])}
        />
      </SectionCard>

      <SectionCard title="Parcelles necessitant une action">
        <ul className="space-y-2 text-sm">
          {actionParcels.map((p) => <li key={p.parcel} className="rounded-xl border p-3">{p.parcel} · {p.farm} · {p.action}</li>)}
        </ul>
      </SectionCard>
    </div>
  );
}
