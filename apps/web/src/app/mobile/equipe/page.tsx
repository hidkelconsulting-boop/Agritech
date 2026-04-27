import { teams } from "@/mock/agri";

export default function MobileEquipePage() {
  const myTeam = teams[0];

  return (
    <div className="space-y-5 p-4">
      {/* My team card */}
      <div className="rounded-2xl bg-[#21352a] p-5 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-[#b9cab5]">Mon équipe</p>
        <p className="mt-1 text-xl font-black">{myTeam.name}</p>
        <p className="text-sm text-[#8aab8e]">Responsable : {myTeam.lead}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/10 py-2">
            <p className="text-xl font-black text-[#d7e675]">{myTeam.members}</p>
            <p className="text-xs text-[#b9cab5]">Membres</p>
          </div>
          <div className="rounded-xl bg-white/10 py-2">
            <p className="text-xl font-black text-[#d7e675]">{myTeam.done}/{myTeam.assigned}</p>
            <p className="text-xs text-[#b9cab5]">Tâches</p>
          </div>
          <div className="rounded-xl bg-white/10 py-2">
            <p className="text-xl font-black text-[#d7e675]">{myTeam.rate}</p>
            <p className="text-xs text-[#b9cab5]">Taux</p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-2 rounded-full bg-[#d7e675]"
            style={{ width: myTeam.rate }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-[#b9cab5]">Dernier check-in : {myTeam.lastCheckin}</p>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Toutes les équipes actives</p>

      <div className="space-y-3">
        {teams.map((team) => (
          <div key={team.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-[#1f3125]">{team.name}</p>
                <p className="mt-0.5 text-sm text-slate-500">Responsable : {team.lead}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {team.done}/{team.assigned} tâches · {team.farmsCovered} ferme(s)
                  {team.late > 0 && <span className="ml-1 text-red-500">· {team.late} en retard</span>}
                </p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${team.rate === "100%" ? "bg-green-100 text-green-700" : parseInt(team.rate) >= 70 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>
                {team.rate}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eef2ee]">
              <div className="h-1.5 rounded-full bg-[#2f6a44]" style={{ width: team.rate }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
