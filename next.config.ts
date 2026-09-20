import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/abdul-cloud-website",
  assetPrefix: "/abdul-cloud-website/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
