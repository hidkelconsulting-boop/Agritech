import { equipment } from "@/mock/agri";
import { DataTable, SectionCard } from "@/components/product/ui";

export default function EquipmentPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Materiel et equipements"
        subtitle="Gardez le controle sur les actifs terrain, la maintenance et les indisponibilites."
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Ajouter un equipement</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Planifier une maintenance</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Filtrer</button>
          </>
        }
      >
        <DataTable
          headers={["Equipement", "Type", "Ferme", "Etat", "Derniere maintenance", "Prochaine maintenance", "Incidents lies", "Statut"]}
          rows={equipment.map((row) => row)}
        />
      </SectionCard>
    </div>
  );
}
