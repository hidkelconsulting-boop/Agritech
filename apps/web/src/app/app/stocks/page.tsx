import { stocks } from "@/mock/agri";
import { DataTable, SectionCard } from "@/components/product/ui";

export default function StocksPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Stocks et intrants"
        subtitle="Anticipez les ruptures et suivez les consommations par ferme et par culture."
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Ajouter un article</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Enregistrer une sortie</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Filtrer</button>
          </>
        }
      >
        <DataTable
          headers={["Article", "Categorie", "Stock actuel", "Seuil minimum", "Unite", "Ferme", "Derniere sortie", "Statut"]}
          rows={stocks.map((row) => row)}
        />
      </SectionCard>
    </div>
  );
}
