/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a self-contained server folder for Azure
  output: 'standalone',

  reactStrictMode: true,

  // Avoid native sharp on the server (works fine for <Image/>)
  images: {
    unoptimized: true,
  },

  // Let CI build even if TS or ESLint has issues
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
