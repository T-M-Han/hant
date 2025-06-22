import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Simple domain whitelist
  },
  reactStrictMode: true,
};

export default nextConfig;