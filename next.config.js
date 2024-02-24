/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // serverComponentsExternalPackages: [
    //   "puppeteer-extra",
    //   "puppeteer-extra-plugin-stealth",
    //   "puppeteer-extra-plugin-adblocker",
    //   "puppeteer-extra-plugin-user-preferences",
    //   "puppeteer-extra-plugin-user-data-dir",        
    // ],
  },
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

module.exports = nextConfig;
