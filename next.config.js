/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.pngkey.com", "www.edigitalagency.com.au"],
  },
}

module.exports = nextConfig
