import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
    // dynamicIO: true,
    // authInterrupts: true,
  }
};

export default nextConfig;
