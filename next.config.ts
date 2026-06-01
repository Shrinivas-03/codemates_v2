import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['3f59-2401-4900-894c-a35f-c04d-549f-e47a-1ae7.ngrok-free.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        // Sanity CDN for project images
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        // Supabase CDN for custom avatars
        protocol: 'https',
        hostname: 'jldcxqkzddeatzfnwtzk.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
