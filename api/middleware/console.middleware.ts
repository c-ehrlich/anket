import { NextApiRequest, NextApiResponse } from "next";

// TODO figure out what `next` should be typed as
export default function consoleMiddleware(req: NextApiRequest, res: NextApiResponse, next: any) {
  console.log('in middleware');
  return next();
}