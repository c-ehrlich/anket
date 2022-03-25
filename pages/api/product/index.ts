// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../api/utils/prisma';
import { getSession } from 'next-auth/react';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  if (session && session.user) {
    console.log(session);
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        creatorId: session.user.id,
      },
    });
  }
  res.json({ message: 'session' });
}
