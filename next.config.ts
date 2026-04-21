import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;
