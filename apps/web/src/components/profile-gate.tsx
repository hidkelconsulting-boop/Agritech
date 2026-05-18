"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { readProfil, type Profil, type RoleProfil } from "@/lib/profile";

export function ProfileGate({
  expectedRole,
  children,
  render,
}: {
  expectedRole?: RoleProfil;
  children?: ReactNode;
  render?: (profil: Profil) => ReactNode;
}) {
  const router = useRouter();
  const [profil, setProfil] = useState<Profil | null | "loading">("loading");

  useEffect(() => {
    const p = readProfil();
    if (!p) {
      router.replace("/onboarding");
      return;
    }
    if (expectedRole && p.role !== expectedRole) {
      // Le profil ne correspond pas à la page : on l'envoie sur sa vraie home
      router.replace(
        p.role === "ouvrier" ? "/mobile" : p.role === "responsable" ? "/responsable" : "/exploitant",
      );
      return;
    }
    setProfil(p);
  }, [expectedRole, router]);

  if (profil === "loading" || profil === null) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-slate-400">
        Chargement…
      </div>
    );
  }

  return <>{render ? render(profil) : children}</>;
}
