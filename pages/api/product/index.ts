import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import consoleMiddleware from '../../../api/middleware/console.middleware';
import requireSession from '../../../api/middleware/requireSession.middleware';
import validateResource from '../../../api/middleware/validateResource.middleware';
import {
  createProductHandler,
  readUsersOwnProductsHandler,
} from '../../../api/product/product.controller';
import { createProductSchema } from '../../../api/product/product.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .get(requireSession, consoleMiddleware, readUsersOwnProductsHandler)
  .post(validateResource(createProductSchema), requireSession, consoleMiddleware, createProductHandler);

export default handler;
