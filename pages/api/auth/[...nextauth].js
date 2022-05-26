import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import prisma from '../../../api/utils/prisma';
import getConfig from 'next/config';

const { serverRuntimeConfig = {} } = getConfig() || {};
console.log('process.env.NEXTAUTH_URL: ' + process.env.NEXTAUTH_URL);
console.log(
  'serverRuntimeConfig.NEXTAUTH_SECRET: ' + serverRuntimeConfig.NEXTAUTH_SECRET
);

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID || serverRuntimeConfig.DISCORD_ID,
      clientSecret:
        process.env.DISCORD_SECRET || serverRuntimeConfig.DISCORD_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || serverRuntimeConfig.GITHUB_ID,
      clientSecret:
        process.env.GITHUB_SECRET || serverRuntimeConfig.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('---in redirect callback');
      console.log('process.env.NEXTAUTH_URL: ' + process.env.NEXTAUTH_URL);
      console.log(
        'serverRuntimeConfig.NEXTAUTH_URL: ' + serverRuntimeConfig.NEXTAUTH_URL
      );
      console.log('url:', url, 'baseUrl:', baseUrl);
      if (url.startsWith('/')) return `${process.env.NEXTAUTH_URL}${url}`;
      return process.env.NEXTAUTH_URL;
      // // Allows relative callback URLs
      // if (url.startsWith('/')) return `${baseUrl}${url}`;
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url;
      // return baseUrl;
    },
  },
  // TODO remove hardcoded url
  secret: process.env.NEXTAUTH_SECRET || serverRuntimeConfig.NEXTAUTH_SECRET,
});
