import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// TODO figure out what `next` should be typed as
export default async function requireSession(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(403).json({ error: 'not authenticated' });
  }

  next();
}
