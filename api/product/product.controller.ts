import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { CreateProductResponse } from './product.schema';
import { createProduct, getProductsByUser } from './product.service';

export async function createProductHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string, product?: CreateProductResponse }>
) {
  const session = await getSession({ req });
  const creatorId = session!.user!.id;

  if (session && session.user) {
    const { name } = req.body;
    const product: CreateProductResponse = await createProduct({
      name,
      creatorId,
    });
    if (product) {
      return res.status(201).json({ message: 'Product created', product });
    }
  }

  return res.status(400).json({ message: 'Failed to create product' });
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
