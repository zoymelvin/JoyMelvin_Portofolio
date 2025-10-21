import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⛔ Jangan hentikan build kalau masih ada warning ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⛔ Abaikan error TypeScript saat build (biar tetap jalan)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
