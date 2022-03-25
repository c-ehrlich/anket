// cl16hvbcm00111o0bml5j2ro0

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../api/utils/prisma';
import { getSession } from 'next-auth/react';
import { Product } from '@prisma/client';

type Data =
  | {
      error: string;
    }
  | {
      product: Product;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  const { id } = req.query;
  if (session && session.user) {
    const product = await prisma.product.findUnique({
      where: {
        id: String(id),
      },
    });
    if (product && product.creatorId === session.user.id)
      return res.json({ product });
  }
  return res.json({ error: `Couldn't retrieve product` });
}
