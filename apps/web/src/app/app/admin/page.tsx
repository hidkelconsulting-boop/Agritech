import { SectionCard } from "@/components/product/ui";

const tabs = [
  "Utilisateurs",
  "Roles",
  "Fermes",
  "Types d'intervention",
  "Categories d'incidents",
  "Notifications",
  "Integrations",
];

export default function AdminPage() {
  return (
    <div className="space-y-5">
      <SectionCard title="Administration" subtitle="Gerez les utilisateurs, les roles, les parametres metier et les configurations de la plateforme.">
        <div className="flex flex-wrap gap-2 text-sm">
          {tabs.map((tab) => (
            <button key={tab} className="rounded-full border px-3 py-1">{tab}</button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Configuration" subtitle="La couche plateforme est concentree ici pour preserver l'experience metier dans les autres pages.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tabs.map((tab) => (
            <article key={tab} className="rounded-2xl border border-[#e6ece3] bg-[#f7faf5] p-4">
              <h3 className="font-bold">{tab}</h3>
              <p className="mt-1 text-sm text-[#546857]">Regles et parametrage operationnel.</p>
              <button className="mt-3 rounded-lg border px-3 py-1 text-sm">Ouvrir</button>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
