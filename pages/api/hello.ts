// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../api/utils/logger';

type Data = {
  name: string;
  cookie: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  logger.info(req.headers)
  res.status(200).json({ name: 'John Doe', cookie: req.headers.cookie! })
}
