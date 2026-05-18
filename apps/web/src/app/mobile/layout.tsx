"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ProfileGate } from "@/components/profile-gate";

const tabs = [
  { label: "Tâches", href: "/mobile", icon: "🌾" },
  { label: "Problèmes", href: "/mobile/incidents", icon: "⚠️" },
  { label: "Photos", href: "/mobile/photos", icon: "📷" },
  { label: "Équipe", href: "/mobile/equipe", icon: "👥" },
  { label: "Terminer", href: "/mobile/cloturer", icon: "✅" },
] as const;

function formatDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MobileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ProfileGate
      expectedRole="ouvrier"
      render={(profil) => (
        <div className="flex min-h-screen flex-col bg-[#eef2ee]">
          <header className="flex-none bg-[#21352a] px-5 pb-4 pt-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.2em] text-[#b9cab5]">AGRITECH · TERRAIN</p>
                <p className="mt-0.5 text-lg font-bold">Bonjour, {profil.prenom}</p>
                <p className="text-sm text-[#8aab8e]">
                  {profil.equipe ?? "Ferme Nanga-Makola"} · {formatDate(new Date())}
                </p>
              </div>
              <div className="flex h-11 w-11 flex-col items-center justify-center rounded-2xl bg-[#d7e675] text-xl font-black text-[#20341f]">
                {profil.prenom.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto pb-24">{children}</main>

          <nav className="fixed bottom-0 left-0 right-0 flex items-stretch border-t border-[#d0d8d0] bg-white shadow-xl">
            {tabs.map(({ label, href, icon }) => {
              const isActive =
                href === "/mobile"
                  ? pathname === "/mobile"
                  : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition ${
                    isActive
                      ? "border-t-2 border-[#2f6a44] bg-[#f0f7f1] text-[#2f6a44]"
                      : "text-[#6d8b6f]"
                  }`}
                >
                  <span className="text-xl leading-none">{icon}</span>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    />
  );
}
