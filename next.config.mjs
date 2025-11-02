// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { reactCompiler: false },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90, 100],
    minimumCacheTTL: 60,
    remotePatterns: [],
  },
  // add this line to produce .next/standalone
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  productionBrowserSourceMaps: false,
};
export default nextConfig;
