/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.buymeacoffee.com",
        port: "",
        pathname: "/buttons/v2/**",
      },
    ],
  },
};

import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  reloadOnOnline: true,
  
})


export default withPWA(nextConfig);
