/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output a self-contained server folder for Azure
  output: 'standalone',

  // Avoid sharp errors on Azure App Service
  images: { unoptimized: true },

  // Keep builds clean on CI
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }
};

export default nextConfig;
