/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080/api',
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig
