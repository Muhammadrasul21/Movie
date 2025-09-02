import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper output for Vercel
  output: "standalone",
  // Optimize for production builds
  swcMinify: true,
  images: {
    // Whitelist TMDB domains
    domains: ["image.tmdb.org"],
    // Alternative: Use remotePatterns for more control (recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
    // Image optimization settings
    formats: ['image/webp', 'image/avif'],
    // Minimum cache time (in seconds)
    minimumCacheTTL: 60,
    // Enable image optimization
    unoptimized: false,
  },
  // Environment variables for Vercel
  env: {
    NEXT_PUBLIC_IMAGE_URL: 'https://image.tmdb.org/t/p',
  },
};

export default nextConfig;