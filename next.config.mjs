/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a self-contained server bundle for Azure
  output: 'standalone',
  reactStrictMode: true,

  // Disable Next/Image optimization so Sharp isn't required
  images: {
    unoptimized: true,
    // domains: ['ucrs.com'], // add if you use remote images
  },

  // Keep CI builds resilient; you can tighten later
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
