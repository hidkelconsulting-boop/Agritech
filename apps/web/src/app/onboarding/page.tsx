"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { homeForRole, writeProfil, type RoleProfil } from "@/lib/profile";

const roles: { value: RoleProfil; emoji: string; titre: string; sousTitre: string }[] = [
  {
    value: "ouvrier",
    emoji: "👷",
    titre: "Ouvrier de terrain",
    sousTitre: "Tu fais les tâches sur la ferme (élevage, étangs, vergers...)",
  },
  {
    value: "responsable",
    emoji: "🧭",
    titre: "Responsable d'exploitation",
    sousTitre: "Tu pilotes les équipes et fais remonter les décisions",
  },
  {
    value: "proprietaire",
    emoji: "🌾",
    titre: "Propriétaire",
    sousTitre: "C'est ton exploitation, tu prends les décisions stratégiques",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [etape, setEtape] = useState<1 | 2 | 3>(1);
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState<RoleProfil | null>(null);
  const [contexte, setContexte] = useState("");

  function valider() {
    if (!prenom || !role) return;
    writeProfil({
      prenom: prenom.trim(),
      role,
      equipe: role === "ouvrier" ? contexte.trim() || undefined : undefined,
      exploitation:
        role !== "ouvrier" ? contexte.trim() || undefined : undefined,
      createdAt: new Date().toISOString(),
    });
    router.replace(homeForRole(role));
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(100%_100%_at_20%_0%,#f6f0df_0%,#e7eadf_45%,#dbe5dc_100%)] px-4 py-8">
      <div className="mx-auto max-w-md">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f6a44]">
            Agritech · Bienvenue
          </p>
          <p className="mt-2 text-3xl font-black text-[#1f3125]">
            Faisons connaissance
          </p>
          <p className="mt-2 text-base text-[#5a6e5d]">
            Pour t&apos;accompagner correctement, dis-moi qui tu es.
          </p>
        </header>

        {/* Indicateur étapes */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className="h-2 rounded-full transition-all"
              style={{
                width: etape === n ? 32 : 16,
                backgroundColor: etape >= n ? "#2f6a44" : "#d0d8d0",
              }}
            />
          ))}
        </div>

        <main className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          {/* Étape 1 : Prénom */}
          {etape === 1 && (
            <div className="flex flex-col gap-4">
              <label className="text-lg font-bold text-[#1f3125]">
                Comment tu t&apos;appelles ?
              </label>
              <p className="text-sm text-[#5a6e5d]">
                Ton prénom suffit, c&apos;est comme ça que je vais t&apos;appeler.
              </p>
              <input
                type="text"
                autoFocus
                placeholder="Ex : Christelle, Pierre, Aimé..."
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && prenom.trim()) setEtape(2);
                }}
                className="min-h-[60px] rounded-2xl border border-[#d0d8d0] bg-[#f8faf8] px-4 text-xl text-[#1f3125] focus:border-[#2f6a44] focus:outline-none"
              />
              <button
                type="button"
                disabled={!prenom.trim()}
                onClick={() => setEtape(2)}
                className="mt-2 flex min-h-[60px] items-center justify-center rounded-2xl bg-[#2f6a44] text-xl font-bold text-white disabled:bg-[#a8b8aa] active:bg-[#27583a]"
              >
                CONTINUER
              </button>
            </div>
          )}

          {/* Étape 2 : Rôle */}
          {etape === 2 && (
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold text-[#1f3125]">
                Bonjour {prenom.trim()} ! Quel est ton rôle sur la ferme ?
              </p>
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => {
                    setRole(r.value);
                    setEtape(3);
                  }}
                  className={`flex min-h-[100px] items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
                    role === r.value
                      ? "border-[#2f6a44] bg-[#f0f7f1]"
                      : "border-[#d0d8d0] bg-white"
                  } active:bg-[#eef2ee]`}
                >
                  <span className="text-5xl leading-none">{r.emoji}</span>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-[#1f3125]">{r.titre}</p>
                    <p className="mt-1 text-sm text-[#5a6e5d]">{r.sousTitre}</p>
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setEtape(1)}
                className="mt-2 flex min-h-[60px] items-center justify-center rounded-2xl border border-[#d0d8d0] bg-white text-lg font-bold text-[#1f3125]"
              >
                RETOUR
              </button>
            </div>
          )}

          {/* Étape 3 : Contexte */}
          {etape === 3 && role && (
            <div className="flex flex-col gap-4">
              <p className="text-lg font-bold text-[#1f3125]">
                {role === "ouvrier"
                  ? "Dans quelle équipe travailles-tu ?"
                  : "Comment s'appelle ton exploitation ?"}
              </p>
              <p className="text-sm text-[#5a6e5d]">
                {role === "ouvrier"
                  ? "Ex : Équipe Élevage Nanga, Équipe Aquaculture, etc. (facultatif)"
                  : "Le nom complet de la ferme (facultatif)."}
              </p>
              <input
                type="text"
                autoFocus
                placeholder={
                  role === "ouvrier"
                    ? "Équipe Élevage Nanga"
                    : "Ferme Nanga-Makola"
                }
                value={contexte}
                onChange={(e) => setContexte(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") valider();
                }}
                className="min-h-[60px] rounded-2xl border border-[#d0d8d0] bg-[#f8faf8] px-4 text-xl text-[#1f3125] focus:border-[#2f6a44] focus:outline-none"
              />
              <button
                type="button"
                onClick={valider}
                className="mt-2 flex min-h-[60px] items-center justify-center rounded-2xl bg-[#2f6a44] text-xl font-bold text-white active:bg-[#27583a]"
              >
                COMMENCER
              </button>
              <button
                type="button"
                onClick={() => setEtape(2)}
                className="flex min-h-[60px] items-center justify-center rounded-2xl border border-[#d0d8d0] bg-white text-lg font-bold text-[#1f3125]"
              >
                RETOUR
              </button>
            </div>
          )}
        </main>

        <footer className="mt-6 text-center text-xs text-[#5a6e5d]">
          Tu peux modifier ces infos plus tard depuis ton profil.
        </footer>
      </div>
    </div>
  );
}
