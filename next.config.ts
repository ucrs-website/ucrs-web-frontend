import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep React Compiler off to avoid the malloc/Zustand issue you noted
  experimental: {
    reactCompiler: false,
  },

  // Important for Azure App Service "server.js" deployment
  output: "standalone",

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      // Add hosts as needed, e.g.:
      // { protocol: "https", hostname: "images.example.com" },
    ],
  },

  // Security + SEO headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
