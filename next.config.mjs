// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // keep standalone so Azure can run `.next/standalone/server.js`
  output: 'standalone',

  // turn off Next.js image optimization (bypasses sharp)
  images: {
    unoptimized: true,
  },

  // if your previous config had other fields (basePath, rewrites, headers, i18n, etc.),
  // copy them into this object too.
};

export default nextConfig;
