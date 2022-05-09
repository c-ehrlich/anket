import { NextApiRequest } from 'next';

export default function getId(req: NextApiRequest): string {
  return Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
}
