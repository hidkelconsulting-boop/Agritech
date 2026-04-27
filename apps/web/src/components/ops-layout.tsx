"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const menu = [
  { label: "Tableau de bord", href: "/ops" },
  { label: "Fermes", href: "/ops/fermes" },
  { label: "Parcelles", href: "/ops/parcelles" },
  { label: "Interventions", href: "/ops/interventions" },
  { label: "Incidents", href: "/ops/incidents" },
  { label: "Equipes", href: "/ops/equipes" },
  { label: "Preuves terrain", href: "/ops/preuves-terrain" },
  { label: "Materiel", href: "/ops/materiel" },
  { label: "Stocks", href: "/ops/stocks" },
  { label: "Analytics", href: "/ops/analytics" },
  { label: "Administration", href: "/ops/administration" },
];

export default function OpsLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(100%_100%_at_20%_0%,#f6f0df_0%,#e7eadf_45%,#dbe5dc_100%)] p-4 sm:p-6">
      <div className="mx-auto grid w-full max-w-[1440px] gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-3xl border border-white/50 bg-[#21352a] p-5 text-white shadow-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#b9cab5]">Agritech</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">Operations</h2>
          <nav className="mt-6 space-y-2">
            {menu.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2 text-sm transition ${
                    active ? "bg-[#d7e675] font-bold text-[#20341f]" : "text-[#d8e5d7] hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-5">
          <header className="rounded-3xl border border-white/65 bg-white/85 p-4 shadow">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#264734] text-lg font-black text-[#d7e675]">A</div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#4f6454]">Cockpit multi-fermes</p>
                  <p className="text-lg font-bold text-[#1f3125]">Execution agricole terrain</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  placeholder="Recherche globale..."
                  className="w-full rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm shadow-inner sm:w-64"
                />
                <select className="rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm">
                  <option>Toutes les fermes</option>
                  <option>Ferme de Kintele</option>
                  <option>Ferme de Mbankana</option>
                </select>
                <button className="rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm">Notifications</button>
                <button className="rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm">Profil</button>
                <button className="rounded-xl bg-[#2f6a44] px-3 py-2 text-sm font-semibold text-white">Action rapide</button>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
