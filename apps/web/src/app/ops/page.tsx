import Link from "next/link";
import { dashboardKpis, farmCards, interventionsRows, incidentRows } from "@/lib/ops-data";

const parcels = [
  ["B12", "Mbankana", "Mais", "07:55", "Moyen", "Verifier irrigation"],
  ["A03", "Kintele", "Manioc", "Hier 16:10", "Eleve", "Inspection sanitaire"],
  ["D07", "Zone Sud", "Tomate", "08:05", "Critique", "Intervention urgente"],
];

const teams = [
  ["Equipe Irrigation 1", "M. Nguema", "8", "6", "75%", "08:42"],
  ["Equipe Recolte 2", "Mme Banza", "5", "5", "100%", "09:03"],
  ["Equipe Maintenance", "Mme Mvoula", "4", "2", "50%", "08:12"],
];

const proofs = [
  ["Photo irrigation", "Ferme Nord", "B12", "Equipe A", "08:47", "Validee"],
  ["Photo maladie foliaire", "Kintele", "A03", "Superviseur 1", "08:39", "A verifier"],
  ["Photo recolte", "Mbankana", "D04", "Equipe Recolte 2", "07:12", "Validee"],
];

export default function OpsDashboardPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-white/65 bg-[linear-gradient(120deg,#1f3a2c_0%,#2e513d_42%,#8f9d5d_100%)] p-6 text-white shadow-xl">
        <h1 className="text-3xl font-black sm:text-4xl">Cockpit des operations agricoles</h1>
        <p className="mt-2 max-w-3xl text-sm text-[#dbe7d9] sm:text-base">
          Suivez vos fermes, priorisez les interventions et gardez le controle sur l&apos;execution terrain en temps reel.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {/* LEGACY - sprint demo: <Link href="/ops/interventions" className="rounded-xl bg-[#d7e675] px-4 py-2 font-semibold text-[#1b2f22]">Creer une intervention</Link> */}
          {/* LEGACY - sprint demo: <Link href="/ops/incidents" className="rounded-xl border border-white/55 bg-white/10 px-4 py-2 font-semibold">Signaler un incident</Link> */}
          {/* LEGACY - sprint demo: <Link href="/ops/fermes" className="rounded-xl border border-white/55 bg-white/10 px-4 py-2 font-semibold">Voir les fermes</Link> */}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardKpis.map((item) => (
          <article key={item.label} className="rounded-2xl border border-white/65 bg-white/85 p-4 shadow">
            <p className="text-sm text-[#617161]">{item.label}</p>
            <p className="mt-1 text-3xl font-black text-[#1e3227]">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-xl font-bold">Interventions du jour</h2>
          <div className="mt-4 space-y-3">
            {interventionsRows.map((row) => (
              <div key={`${row.type}-${row.hour}`} className="rounded-2xl border border-[#e6ece3] bg-[#f7faf5] p-4">
                <p className="font-semibold">{row.type} - {row.farm} - {row.plot}</p>
                <p className="mt-1 text-sm text-[#4e6051]">Equipe: {row.team} · Heure: {row.hour} · Statut: {row.status}</p>
                <div className="mt-2 flex gap-2 text-xs">
                  <button className="rounded bg-white px-2 py-1">Voir detail</button>
                  <button className="rounded bg-white px-2 py-1">Reassigner</button>
                  <button className="rounded bg-white px-2 py-1">Cloturer</button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-xl font-bold">Alertes prioritaires</h2>
          <div className="mt-4 space-y-3">
            {incidentRows.map((row) => (
              <div key={row.incident} className="rounded-2xl border border-[#ece8e2] bg-[#fffdf9] p-4">
                <p className="font-semibold">{row.incident}</p>
                <p className="text-sm text-[#5e544f]">{row.farm} · {row.zone}</p>
                <p className="mt-2 text-xs text-[#7c6f67]">{row.criticality} · {row.date}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
        <h2 className="text-xl font-bold">Etat des fermes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {farmCards.map((farm) => (
            <article key={farm.name} className="rounded-2xl border border-[#e6ece3] bg-[#f8faf7] p-4">
              <h3 className="text-lg font-bold">{farm.name}</h3>
              <p className="mt-2 text-sm text-[#506352]">Surface: {farm.surface} · Parcelles: {farm.plots}</p>
              <p className="text-sm text-[#506352]">Equipes: {farm.teams} · Interventions: {farm.openOps}</p>
              <p className="text-sm text-[#506352]">Incidents: {farm.incidents} · Statut: {farm.status}</p>
              {/* LEGACY - sprint demo: <Link href="/ops/fermes" className="mt-3 inline-block rounded-lg border px-3 py-1 text-sm">Ouvrir la ferme</Link> */}
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-xl font-bold">Parcelles a surveiller</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#dde5dc] text-[#546857]">
                <th className="py-2">Parcelle</th><th className="py-2">Ferme</th><th className="py-2">Culture</th><th className="py-2">Dernier passage</th><th className="py-2">Risque</th><th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p) => (
                <tr key={p[0]} className="border-b border-[#edf2ea]">
                  {p.map((cell) => <td key={cell} className="py-2">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-xl font-bold">Suivi des equipes</h2>
          <div className="mt-4 space-y-3">
            {teams.map((t) => (
              <div key={t[0]} className="rounded-2xl border border-[#e6ece3] bg-[#f7faf5] p-4">
                <p className="font-bold">{t[0]}</p>
                <p className="text-sm text-[#556956]">Responsable: {t[1]}</p>
                <p className="text-sm">Assignees: {t[2]} · Terminees: {t[3]} · Taux: {t[4]} · Check-in: {t[5]}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-xl font-bold">Dernieres preuves terrain</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {proofs.map((p) => (
              <div key={p[0]} className="rounded-2xl border border-[#e7e1d7] bg-[#fffaf2] p-3">
                <div className="h-20 rounded-xl bg-[linear-gradient(135deg,#9bb27f_0%,#6b8453_100%)]" />
                <p className="mt-2 font-semibold">{p[0]}</p>
                <p className="text-xs text-[#72665b]">{p[1]} · {p[2]} · {p[3]} · {p[4]} · {p[5]}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
          <h2 className="text-xl font-bold">Indicateurs operationnels</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Taux execution global", "91%"],
              ["Temps moyen resolution incident", "3h20"],
              ["Ferme la plus performante", "Ferme Nord"],
              ["Ferme la plus exposee", "Zone Sud"],
              ["Culture la plus surveillee", "Mais"],
              ["Equipe la plus reguliere", "Irrigation 1"],
            ].map((m) => (
              <div key={m[0]} className="rounded-2xl border border-[#e6ece3] bg-[#f7faf5] p-4">
                <p className="text-sm text-[#5f715f]">{m[0]}</p>
                <p className="mt-1 text-xl font-black text-[#223628]">{m[1]}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
