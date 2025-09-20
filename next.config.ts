/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // 🚀 вимикає падіння білду через ESLint
  },
};

module.exports = nextConfig;
