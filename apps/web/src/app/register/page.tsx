"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Jessica Kebi");
  const [email, setEmail] = useState("owner@agritech.local");
  const [password, setPassword] = useState("ChangeMe123!");
  const [farmName, setFarmName] = useState("Ferme Prototype");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password, farmName }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(data?.error || "Inscription impossible");
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
      <form className="w-full rounded-2xl bg-white p-6 shadow" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold text-slate-900">Creation de tenant</h1>
        <p className="mt-2 text-sm text-slate-600">Organisation, abonnement et ferme sont provisionnes automatiquement.</p>

        <label className="mt-5 block text-sm text-slate-700">Nom complet</label>
        <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label className="mt-4 block text-sm text-slate-700">Email</label>
        <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="mt-4 block text-sm text-slate-700">Mot de passe</label>
        <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label className="mt-4 block text-sm text-slate-700">Nom de la ferme</label>
        <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={farmName} onChange={(e) => setFarmName(e.target.value)} />

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <button className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white disabled:opacity-60" disabled={isLoading}>
          {isLoading ? "Creation..." : "Creer mon SaaS"}
        </button>
      </form>
    </main>
  );
}
