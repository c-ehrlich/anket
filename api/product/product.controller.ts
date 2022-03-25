import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../utils/prisma';
import { createProduct, getProductsByUser } from './product.service';

export async function createProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // we've already determined that this is possible in middleware
  // TODO: attach the session to req or res.locals so we have it
  const session = await getSession({ req });
  const creatorId = session!.user!.id;

  if (session && session.user) {
    const { name } = req.body;
    const product = await createProduct({ name, creatorId });
    console.log('about to return', product);
  }

  return res.json({ error: 'failed to create product' });
}

export async function readUsersOwnProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;

  const products = await getProductsByUser({ userId });
  return res.json({ products });
}
