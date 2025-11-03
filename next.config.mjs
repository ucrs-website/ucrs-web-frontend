/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a self-contained server for Azure
  output: 'standalone',

  // Avoid the linux "sharp" native binary issue on Azure
  images: { unoptimized: true },

  // Nice-to-haves; remove if you prefer defaults
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
