"use client";

import { useState } from "react";

type Organization = {
  id: string;
  name: string;
  slug: string;
  farms: Array<{ id: string; name: string }>;
  subscriptions: Array<{
    id: string;
    tier: "FREE" | "PRO" | "ENTERPRISE";
    status: "TRIAL" | "ACTIVE" | "PAST_DUE" | "CANCELED";
    renewsAt: string | null;
  }>;
};

type Props = {
  initialOrganizations: Organization[];
};

export default function AdminPanel({ initialOrganizations }: Props) {
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [message, setMessage] = useState("");

  async function refreshOrganizations() {
    const response = await fetch("/api/proxy/admin/organizations", { cache: "no-store" });
    if (!response.ok) {
      setMessage("Impossible de recharger les organisations.");
      return;
    }

    const data = (await response.json()) as Organization[];
    setOrganizations(data);
  }

  async function updateSubscription(organizationId: string, tier: string, status: string) {
    setMessage("");
    const response = await fetch(`/api/proxy/admin/organizations/${organizationId}/subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier, status }),
    });

    if (!response.ok) {
      setMessage("Mise a jour abonnement impossible.");
      return;
    }

    setMessage("Abonnement mis a jour.");
    await refreshOrganizations();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <header className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-3xl font-black text-slate-900">Super Admin</h1>
        <p className="mt-2 text-slate-600">Pilotage des organisations SaaS et des abonnements.</p>
        <div className="mt-3 flex gap-2">
          <button className="rounded bg-slate-100 px-3 py-1 text-sm" onClick={refreshOrganizations}>Rafraichir</button>
          <a href="/app" className="rounded bg-slate-900 px-3 py-1 text-sm text-white">Retour cockpit</a>
        </div>
        {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
      </header>

      <section className="grid gap-4">
        {organizations.map((org) => {
          const latest = org.subscriptions[0];
          return (
            <article key={org.id} className="rounded-2xl bg-white p-5 shadow">
              <h2 className="text-xl font-bold text-slate-900">{org.name}</h2>
              <p className="text-sm text-slate-600">Slug: {org.slug}</p>
              <p className="mt-2 text-sm text-slate-700">Fermes: {org.farms.map((farm) => farm.name).join(", ") || "Aucune"}</p>
              <p className="mt-1 text-sm text-slate-700">
                Abonnement actuel: {latest ? `${latest.tier} / ${latest.status}` : "Aucun"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded bg-slate-100 px-3 py-1 text-sm" onClick={() => updateSubscription(org.id, "FREE", "ACTIVE")}>FREE</button>
                <button className="rounded bg-blue-100 px-3 py-1 text-sm" onClick={() => updateSubscription(org.id, "PRO", "ACTIVE")}>PRO</button>
                <button className="rounded bg-purple-100 px-3 py-1 text-sm" onClick={() => updateSubscription(org.id, "ENTERPRISE", "ACTIVE")}>ENTERPRISE</button>
                <button className="rounded bg-amber-100 px-3 py-1 text-sm" onClick={() => updateSubscription(org.id, latest?.tier ?? "FREE", "PAST_DUE")}>PAST_DUE</button>
                <button className="rounded bg-rose-100 px-3 py-1 text-sm" onClick={() => updateSubscription(org.id, latest?.tier ?? "FREE", "CANCELED")}>CANCELED</button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
