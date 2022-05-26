// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../api/utils/logger';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  logger.info('healthcheck');
  res.status(200).json({
    database_url: process.env.DATABASE_URL,
    nextauth_url: process.env.NEXTAUTH_URL,
  });
}
