/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["w3s.link"],
    formats: ["image/webp"],
  },
}

module.exports = nextConfig
