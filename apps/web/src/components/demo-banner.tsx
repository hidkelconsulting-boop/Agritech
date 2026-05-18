"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "agritech_demo_banner_dismissed";

export function DemoBanner() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHidden(window.localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  function dismiss() {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setHidden(true);
  }

  function reset() {
    if (typeof window === "undefined") return;
    const ok = window.confirm(
      "Reset démo : effacer ton profil, le référentiel local, et recharger la page ?",
    );
    if (!ok) return;
    window.localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
    window.location.href = "/";
  }

  if (hidden) return null;

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-[#fef3c7] px-4 py-2 text-[#7c2d12] shadow-sm"
      role="banner"
    >
      <p className="flex items-center gap-2 text-xs sm:text-sm">
        <span aria-hidden="true">🧪</span>
        <span>
          <strong>Aperçu démonstration</strong> · données fictives · Ferme Pilote Nanga-Makola.
        </span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#7c2d12] shadow-sm hover:bg-[#fff1d6]"
          title="Effacer les données locales et redémarrer la démo"
        >
          ↻ Reset démo
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Masquer la bannière"
          className="rounded-md px-2 py-1 text-xs font-bold text-[#7c2d12] hover:bg-white/50"
          title="Masquer ce bandeau"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
