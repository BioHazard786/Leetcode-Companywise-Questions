import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Cloudflare Pages
  experimental: {
    serverComponentsExternalPackages: ["@neondatabase/serverless"],
  },
  // Ensure compatibility with Cloudflare's edge runtime
  images: {
    unoptimized: true,
  },
  // Disable static generation for pages using edge runtime with dynamic content
  generateStaticParams: false,
};

export default nextConfig;
