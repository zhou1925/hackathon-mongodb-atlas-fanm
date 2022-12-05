/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_BACKEND: 'http://127.0.0.1:8000',
  }
}

module.exports = nextConfig
