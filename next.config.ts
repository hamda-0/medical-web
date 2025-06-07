import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
    ],
  },
  webpack(config) {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        "react-hook-form": require.resolve("react-hook-form"),
      },
    };
    return config;
  },
};

export default nextConfig;
