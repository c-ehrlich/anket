import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import prisma from '../../../api/utils/prisma';
import getConfig from 'next/config';

const { serverRuntimeConfig = {} } = getConfig() || {}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: serverRuntimeConfig.DISCORD_ID,
      clientSecret: serverRuntimeConfig.DISCORD_SECRET,
    }),
    GithubProvider({
      clientId: serverRuntimeConfig.GITHUB_ID,
      clientSecret: serverRuntimeConfig.GITHUB_SECRET,
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
  },
  url: serverRuntimeConfig.NEXTAUTH_URL,
  secret: serverRuntimeConfig.NEXTAUTH_SECRET,
});
