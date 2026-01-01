import { fileURLToPath } from "url";

import type { NextConfig } from "next";

import { createJiti } from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

void jiti.import("./src/config/env");

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
