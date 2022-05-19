import { PrismaClient } from '@prisma/client';
import logger from './logger';

// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

console.log('env: ' + process.env.NODE_ENV);

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
