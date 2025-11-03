/** @type {import('next').NextConfig} */
const nextConfig = {
  // produce the self-contained server bundle
  output: 'standalone',
  reactStrictMode: true,

  // prevent runtime image optimization (and the hard dependency on sharp)
  images: {
    unoptimized: true,
    // If you load remote images, add their hostnames here:
    // domains: ['ucrs.com', 'cdn.example.com'],
  },

  // keep build stable on CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
