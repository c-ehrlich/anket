import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-connect' {
  interface Error {
    status?: number;
  }
}
