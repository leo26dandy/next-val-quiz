/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.valorant-api.com'
    ],
  },
  env: {
    apiEndpoint: 'https://next-val-quiz.vercel.app/api/'
  },
}

module.exports = nextConfig
