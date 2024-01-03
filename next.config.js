/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.valorant-api.com'
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
