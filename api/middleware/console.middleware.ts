import { NextApiRequest, NextApiResponse } from "next";
import logger from "../utils/logger";

// TODO figure out what `next` should be typed as
export default function consoleMiddleware(req: NextApiRequest, res: NextApiResponse, next: any) {
  logger.info('in middleware');
  return next();
}