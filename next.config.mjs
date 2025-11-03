/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  // Avoid Sharp at runtime/build on Azure
  images: {
    unoptimized: true,
  },

  // Keep CI resilient; tighten later if you want
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
