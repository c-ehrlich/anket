import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { RequestHandler } from 'next-connect';

const requireSession: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(403).json({ error: 'not authenticated' });
  }

  next();
};

export default requireSession;
