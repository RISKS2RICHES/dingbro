import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.postimg.cc' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'home.scotland-excel.org.uk' },
      { protocol: 'https', hostname: 'snvwynjuhzdkdkszbvcf.supabase.co' },
    ],
  },
};

export default nextConfig;
