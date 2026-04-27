import Link from "next/link";
import { proofs } from "@/mock/agri";
import { ProofCard } from "@/components/product/cards";
import { SectionCard } from "@/components/product/ui";

export default function ProofsPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Preuves terrain"
        subtitle="Centralisez les photos, commentaires et validations lies aux operations de terrain."
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Importer une preuve</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Voir les non validees</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Filtrer</button>
          </>
        }
      >
        <div className="flex flex-wrap gap-2 text-sm">
          {['Ferme','Parcelle','Intervention','Equipe','Statut de validation','Date'].map((f) => <span key={f} className="rounded-full border px-3 py-1">{f}</span>)}
        </div>
      </SectionCard>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {proofs.map((proof) => (
          <div key={proof.id} className="space-y-2">
            <ProofCard proof={proof} />
            <div className="flex gap-2 text-xs">
              <Link href={`/app/proofs/${proof.id}`} className="rounded border px-2 py-1">Voir</Link>
              <button className="rounded border px-2 py-1">Valider</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
