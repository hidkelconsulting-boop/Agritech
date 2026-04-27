import { proofs } from "@/mock/agri";
import { SectionCard } from "@/components/product/ui";

export default async function ProofDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proof = proofs.find((item) => item.id === id) ?? proofs[0];

  return (
    <div className="space-y-5">
      <SectionCard title="Preuve terrain - Irrigation terminee" subtitle="Ferme Nord · B12 · Equipe Irrigation 1">
        <div className="h-72 rounded-3xl bg-[linear-gradient(135deg,#9bb27f_0%,#6b8453_100%)]" />
      </SectionCard>

      <SectionCard title="Informations associees">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 text-sm">
          <p>Date et heure: <strong>05/04 08:54</strong></p>
          <p>Auteur: <strong>{proof.author}</strong></p>
          <p>Ferme: <strong>{proof.farm}</strong></p>
          <p>Parcelle: <strong>{proof.parcel}</strong></p>
          <p>Intervention liee: <strong>Irrigation de routine</strong></p>
          <p>Statut de validation: <strong>{proof.status}</strong></p>
          <p>Commentaire terrain: <strong>Intervention terminee et debit stable.</strong></p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Valider la preuve</button>
          <button className="rounded-xl border px-4 py-2 text-sm">Demander un complement</button>
          <button className="rounded-xl border px-4 py-2 text-sm">Associer a un incident</button>
        </div>
      </SectionCard>
    </div>
  );
}
