import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Fix one of your pages that leverages the next/image component, 
    // passed a src value that uses a hostname in the URL that isn't defined our configuration :
    // https://nextjs.org/docs/messages/next-image-unconfigured-host
    remotePatterns: [new URL('https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/**')],
  }
};

export default nextConfig;
