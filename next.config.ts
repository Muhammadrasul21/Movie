import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable experimental features that might cause build issues
    turbo: false,
  },
  // Ensure proper output for Vercel
  output: 'standalone',
  // Optimize for production builds
  swcMinify: true,
};

export default nextConfig;
