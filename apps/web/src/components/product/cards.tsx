import { RiskBadge, StatusBadge } from "./ui";

export function FarmCard({ farm }: { farm: { name: string; surface: string; parcels: number; teams: number; dayInterventions: number; incidents: number; status: string } }) {
  return (
    <article className="rounded-2xl border border-[#e6ece3] bg-[#f8faf7] p-4">
      <h3 className="text-lg font-bold">{farm.name}</h3>
      <p className="mt-2 text-sm text-[#506352]">Surface: {farm.surface}</p>
      <p className="text-sm text-[#506352]">Parcelles: {farm.parcels} · Equipes actives: {farm.teams}</p>
      <p className="text-sm text-[#506352]">Interventions du jour: {farm.dayInterventions} · Incidents ouverts: {farm.incidents}</p>
      <div className="mt-2"><StatusBadge value={farm.status} /></div>
      <button className="mt-3 rounded-lg border px-3 py-1 text-sm">Ouvrir la ferme</button>
    </article>
  );
}

export function AlertCard({ alert }: { alert: { title: string; farm: string; zone: string; level: string } }) {
  return (
    <article className="rounded-2xl border border-[#ece8e2] bg-[#fffdf9] p-4">
      <p className="font-semibold">{alert.title}</p>
      <p className="mt-1 text-sm text-[#5e544f]">Ferme: {alert.farm}</p>
      <p className="text-sm text-[#5e544f]">Zone: {alert.zone}</p>
      <div className="mt-2 flex items-center justify-between">
        <RiskBadge value={alert.level} />
        <button className="rounded-lg border border-[#d9d0c8] px-2 py-1 text-xs font-semibold text-[#56463e]">Voir le detail</button>
      </div>
    </article>
  );
}

export function TeamCard({ team }: { team: { name: string; lead: string; assigned: number; done: number; rate: string; lastCheckin: string } }) {
  return (
    <article className="rounded-2xl border border-[#e6ece3] bg-[#f7faf5] p-4">
      <p className="font-bold">{team.name}</p>
      <p className="text-sm text-[#556956]">Responsable: {team.lead}</p>
      <p className="mt-2 text-sm">Assignees: {team.assigned} · Terminees: {team.done}</p>
      <p className="text-sm">Taux d&apos;execution: {team.rate} · Dernier check-in: {team.lastCheckin}</p>
      <div className="mt-2 h-2 rounded-full bg-[#dde7d9]">
        <div className="h-2 rounded-full bg-[#2f6a44]" style={{ width: team.rate }} />
      </div>
    </article>
  );
}

export function ProofCard({ proof }: { proof: { title: string; farm: string; parcel: string; author: string; hour: string; status: string } }) {
  return (
    <article className="rounded-2xl border border-[#e7e1d7] bg-[#fffaf2] p-3">
      <div className="h-24 rounded-xl bg-[linear-gradient(135deg,#9bb27f_0%,#6b8453_100%)]" />
      <p className="mt-3 font-semibold">{proof.title}</p>
      <p className="text-sm text-[#5c5349]">{proof.farm} · {proof.parcel}</p>
      <p className="mt-1 text-xs text-[#72665b]">Par: {proof.author} · {proof.hour}</p>
      <p className="mt-2"><StatusBadge value={proof.status} /></p>
    </article>
  );
}
