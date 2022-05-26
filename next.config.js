/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  experimental: {
    reactRoot: true,
    env: {
      NEXT_TESTVAR: process.env.NEXT_TESTVAR,
    },
  },
};

module.exports = nextConfig;
