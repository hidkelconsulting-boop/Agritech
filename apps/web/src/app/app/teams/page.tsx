import Link from "next/link";
import { teams } from "@/mock/agri";
import { SectionCard } from "@/components/product/ui";
import { TeamCard } from "@/components/product/cards";

export default function TeamsPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Equipes terrain"
        subtitle="Suivez l'activite des equipes, leur charge et leur performance operationnelle."
        actions={
          <>
            <button className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Ajouter une equipe</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Affectation rapide</button>
            <button className="rounded-xl border px-4 py-2 text-sm">Voir la charge</button>
          </>
        }
      >
        <></>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <div key={team.id} className="space-y-2">
            <TeamCard team={team} />
            <div className="flex gap-2 text-sm">
              <Link href={`/app/teams/${team.id}`} className="rounded-lg border px-2 py-1">Voir l&apos;equipe</Link>
              <button className="rounded-lg border px-2 py-1">Voir le planning</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
