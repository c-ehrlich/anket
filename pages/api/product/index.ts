import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import consoleMiddleware from '../../../api/middleware/console.middleware';
import requireSession from '../../../api/middleware/requireSession.middleware';
import {
  createProductHandler,
  readUsersOwnProductsHandler,
} from '../../../api/product/product.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .get(requireSession, consoleMiddleware, readUsersOwnProductsHandler)
  .post(requireSession, consoleMiddleware, createProductHandler);

export default handler;
