"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  ["Tableau de bord", "/app"],
  ["Fermes", "/app/farms"],
  ["Parcelles", "/app/parcels"],
  ["Interventions", "/app/interventions"],
  ["Incidents", "/app/incidents"],
  ["Equipes", "/app/teams"],
  ["Preuves terrain", "/app/proofs"],
  ["Materiel", "/app/equipment"],
  ["Stocks", "/app/stocks"],
  ["Analytics", "/app/analytics"],
  ["Administration", "/app/admin"],
] as const;

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[radial-gradient(100%_100%_at_20%_0%,#f6f0df_0%,#e7eadf_45%,#dbe5dc_100%)] p-4 sm:p-6">
      <div className="mx-auto grid w-full max-w-[1440px] gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-3xl border border-white/50 bg-[#21352a] p-5 text-white shadow-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#b9cab5]">Agritech</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">Operations</h2>
          <nav className="mt-6 space-y-2">
            {nav.map(([label, href]) => {
              const isActive = href === "/app" ? pathname === "/app" : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block rounded-xl px-3 py-2 text-sm transition ${isActive ? "bg-[#d7e675] font-bold text-[#20341f]" : "text-[#d8e5d7] hover:bg-white/10"}`}
                >
                  {label}
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
                  <p className="text-xs uppercase tracking-[0.22em] text-[#4f6454]">Pilotage multi-fermes</p>
                  <p className="text-lg font-bold text-[#1f3125]">Execution et supervision terrain</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  placeholder="Rechercher une ferme, une parcelle, une intervention ou un incident"
                  className="w-full rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm shadow-inner sm:w-80"
                />
                <select className="rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm">
                  <option>Toutes les fermes</option>
                </select>
                <button className="rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm">Notifications</button>
                <button className="rounded-xl border border-[#d7dfd5] bg-white px-3 py-2 text-sm">Profil</button>
                <button className="rounded-xl bg-[#2f6a44] px-3 py-2 text-sm font-semibold text-white">Nouvelle intervention</button>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
