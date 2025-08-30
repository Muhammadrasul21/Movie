import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper output for Vercel
  output: "standalone",
  // Optimize for production builds
  swcMinify: true,
};

export default nextConfig;
