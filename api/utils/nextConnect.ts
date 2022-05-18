import { NextApiRequest, NextApiResponse } from 'next';
import Error from 'next/error';

type NextConnectError = Error & {
  status: number;
  message: Text;
};

export const nextConnectOptions = {
  onError(err: NextConnectError, req: NextApiRequest, res: NextApiResponse) {
    console.error(err);
    res.statusCode =
      err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
    res.json({ message: err.message });
  },
};
