"use client";

import type { ReactNode } from "react";
import { ProfileGate } from "@/components/profile-gate";

export default function ResponsableLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileGate
      expectedRole="responsable"
      render={(profil) => (
        <div className="min-h-screen bg-[radial-gradient(100%_100%_at_20%_0%,#eef2f7_0%,#dde5ee_45%,#cdd9e5_100%)] px-4 py-5 sm:px-6">
          <div className="mx-auto max-w-[920px]">
            <header className="rounded-3xl bg-white/85 p-5 shadow">
              <p className="text-xs uppercase tracking-[0.2em] text-[#445869]">
                Cockpit du chef de site
              </p>
              <p className="mt-1 text-2xl font-black text-[#1f2937]">
                Bonjour {profil.prenom} · Fil de décision du jour
              </p>
              <p className="mt-1 text-sm text-[#475569]">
                {profil.exploitation ? `${profil.exploitation} · ` : ""}
                Ce que tu dois traiter, valider, escalader. Les priorités sont déjà triées.
              </p>
            </header>
            <main className="mt-5 space-y-5">{children}</main>
          </div>
        </div>
      )}
    />
  );
}
