import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@om-apex/brand'],
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/amenities.html', destination: '/amenities', permanent: true },
      { source: '/todo.html', destination: '/things-to-do', permanent: true },
      { source: '/attractions.html', destination: '/attractions', permanent: true },
      { source: '/restaurants.html', destination: '/restaurants', permanent: true },
      { source: '/rules.html', destination: '/house-rules', permanent: true },
      { source: '/howto.html', destination: '/how-to-videos', permanent: true },
    ]
  },
};

export default nextConfig;
