import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Keeps Turbopack resolving from this app root (important in monorepos; harmless standalone).
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/modules/operational-blueprint",
        destination: "/process",
        permanent: true,
      },
      {
        source: "/modules/process",
        destination: "/process",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
