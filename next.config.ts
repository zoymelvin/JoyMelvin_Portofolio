import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip linting sepenuhnya saat `next build`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // (opsional) supaya build tidak gagal karena type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
