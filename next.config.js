/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_PINATA_GATEWAY?.replace("https://", "")],
  },
};

module.exports = nextConfig;
