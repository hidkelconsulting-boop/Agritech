"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { writeProfil, type RoleProfil } from "@/lib/profile";

type RoleConfig = {
  label: string;
  icon: string;
  description: string;
  redirect: string;
  accent: string;
  bg: string;
  defaultEmail: string;
  profilRole: RoleProfil;
};

const ROLE_CONFIG: Record<string, RoleConfig> = {
  ouvrier: {
    label: "Ouvrier terrain",
    icon: "🌾",
    description: "Mes tâches, mes incidents, mes photos",
    redirect: "/mobile",
    accent: "#2f6a44",
    bg: "bg-[#f0f7f1]",
    defaultEmail: "ouvrier@agritech.local",
    profilRole: "ouvrier",
  },
  responsable: {
    label: "Responsable d'exploitation",
    icon: "🧭",
    description: "Piloter les équipes, prioriser, escalader",
    redirect: "/responsable",
    accent: "#1d4ed8",
    bg: "bg-[#eef2f7]",
    defaultEmail: "responsable@agritech.local",
    profilRole: "responsable",
  },
  exploitant: {
    label: "Exploitant / Patron",
    icon: "👨‍🌾",
    description: "Piloter les fermes, suivre les équipes",
    redirect: "/exploitant",
    accent: "#21352a",
    bg: "bg-[#21352a]",
    defaultEmail: "patron@agritech.local",
    profilRole: "proprietaire",
  },
};

const PRENOMS_PAR_EMAIL: Record<string, string> = {
  "ouvrier@agritech.local": "Christelle",
  "responsable@agritech.local": "Marie",
  "patron@agritech.local": "Aimé",
};

function devinePrenom(email: string): string {
  if (PRENOMS_PAR_EMAIL[email]) return PRENOMS_PAR_EMAIL[email];
  const local = email.split("@")[0];
  const cleaned = local.split(/[._-]/)[0].replace(/[^a-zA-Zéèàâî]/g, "");
  if (!cleaned) return "Utilisateur";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") ?? "exploitant";
  const config = ROLE_CONFIG[roleParam] ?? ROLE_CONFIG.exploitant;

  const [email, setEmail] = useState<string>(config.defaultEmail);
  const [password, setPassword] = useState("ChangeMe123!");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(data?.error ?? "Connexion impossible");
      return;
    }

    // Synchroniser le profil local (ProfileGate) avec la session API
    writeProfil({
      prenom: devinePrenom(email),
      role: config.profilRole,
      exploitation: config.profilRole !== "ouvrier" ? "Ferme Pilote Nanga" : undefined,
      equipe: config.profilRole === "ouvrier" ? "Équipe Élevage Nanga" : undefined,
      createdAt: new Date().toISOString(),
    });

    router.push(config.redirect);
    router.refresh();
  }

  const isDark = roleParam === "exploitant";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(100%_100%_at_20%_0%,#f6f0df_0%,#e7eadf_45%,#dbe5dc_100%)] px-5">
      {/* Header profil */}
      <div
        className={`mb-6 flex flex-col items-center gap-3 rounded-3xl px-8 py-6 text-center shadow ${
          isDark ? "bg-[#21352a] text-white" : "bg-white"
        }`}
      >
        <span className="text-5xl">{config.icon}</span>
        <p
          className={`text-xl font-black ${isDark ? "text-[#d7e675]" : "text-[#1f3125]"}`}
        >
          {config.label}
        </p>
        <p className={`text-sm ${isDark ? "text-[#9ab89e]" : "text-[#5a6e5d]"}`}>
          {config.description}
        </p>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow"
      >
        <h1 className="text-lg font-black text-[#1f3125]">Connexion</h1>
        <p className="mt-1 text-xs text-[#607362]">Session sécurisée via cookie HTTP-only</p>

        <label className="mt-5 block text-sm font-semibold text-[#3b5040]">Email</label>
        <input
          className="mt-1 w-full rounded-xl border border-[#d0d8d0] bg-[#f8faf8] px-3 py-3 text-sm text-[#1f3125]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <label className="mt-4 block text-sm font-semibold text-[#3b5040]">Mot de passe</label>
        <input
          className="mt-1 w-full rounded-xl border border-[#d0d8d0] bg-[#f8faf8] px-3 py-3 text-sm text-[#1f3125]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 w-full rounded-xl bg-[#2f6a44] py-3.5 text-sm font-black text-white disabled:opacity-60"
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>

      {/* Retour */}
      <Link
        href="/"
        className="mt-6 text-xs text-[#6d8b6f] underline underline-offset-2"
      >
        ← Changer de profil
      </Link>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
