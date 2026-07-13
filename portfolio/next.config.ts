import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 75],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
