import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // indicators are hidden via globals.css
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignore lint errors for faster builds in constrained environments
    ignoreDuringBuilds: true,
  }
};





export default nextConfig;
