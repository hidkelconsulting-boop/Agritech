import type { NextConfig } from "next";
import path from "node:path";

// L'API tourne sur Railway en prod, en local par défaut sur 4000.
// Le rewrite ci-dessous permet au front d'appeler /api/* sans CORS
// (les cookies HTTP-only restent same-origin côté navigateur).
const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN}/:path*`,
      },
    ];
  },
};

export default nextConfig;
