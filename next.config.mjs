/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow processing files up to reasonable size
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
