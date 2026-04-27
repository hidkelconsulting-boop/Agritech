import type { ReactNode } from "react";

export function SectionCard({ title, subtitle, actions, children }: { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/65 bg-white/85 p-5 shadow">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[#1f3125]">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-[#506352]">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return (
    <SectionCard title={title} subtitle={subtitle} actions={actions}>
      <></>
    </SectionCard>
  );
}

export function KpiCard({ label, value, subtext }: { label: string; value: string; subtext: string }) {
  return (
    <article className="rounded-2xl border border-white/65 bg-white/85 p-4 shadow">
      <p className="text-sm text-[#617161]">{label}</p>
      <p className="mt-1 text-3xl font-black text-[#1e3227]">{value}</p>
      <p className="mt-1 text-xs text-[#6f7d70]">{subtext}</p>
    </article>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    "A planifier": "bg-slate-100 text-slate-700",
    Planifiee: "bg-blue-100 text-blue-700",
    "En cours": "bg-cyan-100 text-cyan-800",
    "A valider": "bg-amber-100 text-amber-800",
    Terminee: "bg-emerald-100 text-emerald-800",
    "En retard": "bg-rose-100 text-rose-800",
    Ouvert: "bg-amber-100 text-amber-800",
    "En investigation": "bg-orange-100 text-orange-800",
    Assigne: "bg-blue-100 text-blue-800",
    Traite: "bg-emerald-100 text-emerald-800",
    Cloture: "bg-slate-200 text-slate-800",
  };
  return <span className={`rounded-full px-2 py-1 text-xs font-bold ${map[value] || "bg-slate-100 text-slate-700"}`}>{value}</span>;
}

export function PriorityBadge({ value }: { value: string }) {
  const cls = value === "Haute" || value === "Critique" ? "bg-rose-100 text-rose-800" : value === "Moyenne" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700";
  return <span className={`rounded-full px-2 py-1 text-xs font-bold ${cls}`}>{value}</span>;
}

export function RiskBadge({ value }: { value: string }) {
  const cls = value === "Critique" ? "bg-rose-100 text-rose-800" : value === "Eleve" ? "bg-amber-100 text-amber-800" : "bg-lime-100 text-lime-800";
  return <span className={`rounded-full px-2 py-1 text-xs font-bold ${cls}`}>{value}</span>;
}

export function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#dde5dc] text-[#546857]">
            {headers.map((h) => <th key={h} className="py-2 pr-3">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#edf2ea]">
              {row.map((cell, cIdx) => <td key={`${idx}-${cIdx}`} className="py-3 pr-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Timeline({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-[#e6ece3] bg-[#f8faf7] p-3">{item}</li>
      ))}
    </ol>
  );
}

export function KanbanColumn({ title, cards }: { title: string; cards: string[] }) {
  return (
    <article className="rounded-2xl border border-[#e6ece3] bg-[#f8faf7] p-3">
      <h3 className="text-sm font-bold uppercase tracking-wide text-[#425746]">{title}</h3>
      <div className="mt-3 space-y-2">
        {cards.map((card) => (
          <div key={card} className="rounded-xl border border-[#dde7d9] bg-white p-3 text-sm">
            <p className="font-semibold">{card}</p>
            <p className="mt-1 text-xs text-[#5c6f5d]">Ferme Nord · B12</p>
          </div>
        ))}
      </div>
    </article>
  );
}
