import Link from "next/link";
import {
  actionParcels,
  dashboardKpis,
  farms,
  interventionsToday,
  operationalMetrics,
  priorityAlerts,
  proofs,
  teams,
} from "@/mock/agri";
import { AlertCard, FarmCard, ProofCard, TeamCard } from "@/components/product/cards";
import { DataTable, KpiCard, PriorityBadge, RiskBadge, SectionCard, StatusBadge } from "@/components/product/ui";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <SectionCard
        title="Cockpit des operations agricoles"
        subtitle="Suivez vos fermes, priorisez les interventions et gardez le controle sur l'execution terrain en temps reel."
        actions={
          <>
            <Link href="/app/farms" className="rounded-xl border px-4 py-2 text-sm font-semibold">Voir les fermes</Link>
            <Link href="/app/interventions" className="rounded-xl bg-[#2f6a44] px-4 py-2 text-sm font-semibold text-white">Creer une intervention</Link>
          </>
        }
      >
        <></>
      </SectionCard>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} subtext={kpi.subtext} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard title="Interventions du jour" subtitle="Operations planifiees, en cours ou a valider">
          <DataTable
            headers={["Intervention", "Ferme", "Parcelle", "Equipe", "Heure", "Statut", "Actions"]}
            rows={interventionsToday.map((row) => [
              row.intervention,
              row.farm,
              row.parcel,
              row.team,
              row.hour,
              <StatusBadge key={`status-${row.intervention}`} value={row.status} />,
              <div key={`actions-${row.intervention}`} className="flex gap-1 text-xs">
                <button className="rounded border px-2 py-1">Voir detail</button>
                <button className="rounded border px-2 py-1">Reassigner</button>
                <button className="rounded border px-2 py-1">Cloturer</button>
              </div>,
            ])}
          />
        </SectionCard>

        <SectionCard title="Alertes prioritaires" subtitle="Incidents et anomalies necessitant une decision rapide">
          <div className="space-y-3">
            {priorityAlerts.map((alert) => (
              <AlertCard key={`${alert.title}-${alert.zone}`} alert={alert} />
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard title="Etat des exploitations" subtitle="Vue synthetique des fermes et des sites a surveiller">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {farms.map((farm) => <FarmCard key={farm.id} farm={farm} />)}
        </div>
      </SectionCard>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Parcelles necessitant une action">
          <DataTable
            headers={["Parcelle", "Ferme", "Culture", "Dernier passage", "Risque", "Action recommandee"]}
            rows={actionParcels.map((p) => [p.parcel, p.farm, p.crop, p.lastVisit, <RiskBadge key={`risk-${p.parcel}`} value={p.risk} />, p.action])}
          />
        </SectionCard>

        <SectionCard title="Suivi des equipes terrain">
          <div className="space-y-3">
            {teams.map((team) => <TeamCard key={team.id} team={team} />)}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Dernieres preuves terrain">
          <div className="grid gap-3 sm:grid-cols-2">
            {proofs.map((proof) => <ProofCard key={proof.id} proof={proof} />)}
          </div>
        </SectionCard>

        <SectionCard title="Indicateurs operationnels">
          <div className="grid gap-3 sm:grid-cols-2">
            {operationalMetrics.map((m) => (
              <article key={m.label} className="rounded-2xl border border-[#e6ece3] bg-[#f7faf5] p-4">
                <p className="text-sm text-[#5f715f]">{m.label}</p>
                <p className="mt-1 text-xl font-black text-[#223628]">{m.value}</p>
              </article>
            ))}
            <article className="rounded-2xl border border-[#e6ece3] bg-[#f7faf5] p-4">
              <p className="text-sm text-[#5f715f]">Priorite terrain actuelle</p>
              <p className="mt-1 text-xl font-black text-[#223628]">Irrigation et phytosanitaire</p>
              <div className="mt-2"><PriorityBadge value="Critique" /></div>
            </article>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
