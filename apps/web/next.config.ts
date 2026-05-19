import type { NextConfig } from "next";
import path from "node:path";

// L'API tourne sur Railway en prod, en local par défaut sur 4000.
// Les appels au backend passent par les routes Next.js dédiées sous
// /api/auth/* (login, register, logout) et /api/proxy/[...path] qui
// gère l'authentification via cookies HTTP-only.
// L'URL du backend est lue depuis NEXT_PUBLIC_API_URL via @/lib/config.

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
