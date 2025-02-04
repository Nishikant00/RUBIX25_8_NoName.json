import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[
      {
      protocol:"https",
      hostname:"edf2-43-231-238-206.ngrok-free.app"
      }
    ]
  }
};

export default nextConfig;
