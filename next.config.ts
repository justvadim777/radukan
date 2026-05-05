import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["raducan.pro", "www.raducan.pro"],
    },
  },
  generateBuildId: async () => {
    return process.env.BUILD_ID || "main";
  },
};

export default withNextIntl(nextConfig);
