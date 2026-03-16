import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: ['192.168.113.73'],
  watchOptions: {
    pollIntervalMs: 5000,
  },
};

export default nextConfig;
