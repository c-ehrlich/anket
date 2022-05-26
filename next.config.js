module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    // reactStrictMode: true,
    experimental: {
      reactRoot: true,
    },
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      DISCORD_ID: process.env.DISCORD_ID,
      DISCORD_SECRET: process.env.DISCORD_SECRET,
      GITHUB_ID: process.env.GITHUB_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
    serverRuntimeConfig: {
      DATABASE_URL: process.env.DATABASE_URL,
      DISCORD_ID: process.env.DISCORD_ID,
      DISCORD_SECRET: process.env.DISCORD_SECRET,
      GITHUB_ID: process.env.GITHUB_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    }
  }
  return nextConfig
}