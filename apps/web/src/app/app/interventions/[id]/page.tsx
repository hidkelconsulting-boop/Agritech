import { SectionCard, StatusBadge, Timeline } from "@/components/product/ui";

const checklist = [
  "Verifier l'acces a la zone",
  "Controler le materiel",
  "Executer l'operation",
  "Prendre une photo de fin",
  "Ajouter un commentaire",
  "Cloturer l'intervention",
];

const logs = [
  "Creee par Admin Ops - 05/04 07:45",
  "Assignee a Equipe Irrigation 1 - 05/04 07:46",
  "Demarree par M. Nguema - 05/04 08:31",
  "Photo ajoutee - 05/04 08:54",
];

export default async function InterventionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  return (
    <div className="space-y-5">
      <SectionCard
        title="Intervention d'irrigation - Parcelle B12"
        subtitle="Ferme Nord · Assignee a Equipe Irrigation 1 · Priorite haute"
        actions={
          <>
            <button className="rounded-xl border px-4 py-2 text-sm">Reassigner</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Reporter</button>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Cloturer</button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 text-sm">
          <p>Type d&apos;intervention: <strong>Irrigation</strong></p>
          <p>Ferme: <strong>Ferme Nord</strong></p>
          <p>Parcelle: <strong>B12</strong></p>
          <p>Culture: <strong>Mais</strong></p>
          <p>Responsable: <strong>M. Nguema</strong></p>
          <p>Equipe affectee: <strong>Equipe Irrigation 1</strong></p>
          <p>Date prevue: <strong>05/04</strong></p>
          <p>Heure prevue: <strong>08:30</strong></p>
          <p>Priorite: <strong>Haute</strong></p>
          <p>Statut: <StatusBadge value="En cours" /></p>
        </div>
      </SectionCard>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Consignes operationnelles">
          <p className="text-sm text-[#4e6051]">Verifier le niveau d&apos;humidite, lancer l&apos;arrosage sur la zone centrale, controler la pression du reseau et documenter la fin d&apos;intervention avec photo.</p>
        </SectionCard>
        <SectionCard title="Checklist terrain">
          <ul className="space-y-2 text-sm">
            {checklist.map((item) => <li key={item} className="rounded-xl border p-3">{item}</li>)}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Preuves et validation" subtitle="Photo avant · Photo apres · Commentaire terrain · Validation superviseur">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-36 rounded-2xl bg-[linear-gradient(135deg,#9bb27f_0%,#6b8453_100%)]" />
            <div className="h-36 rounded-2xl bg-[linear-gradient(135deg,#7aa0c4_0%,#4f6f8b_100%)]" />
          </div>
        </SectionCard>
        <SectionCard title="Journal de suivi">
          <Timeline items={logs} />
        </SectionCard>
      </section>
    </div>
  );
}
