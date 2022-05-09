import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { getUserProfileWithSurveysHandler } from '../../../api/user/user.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().get(
  requireSession,
  getUserProfileWithSurveysHandler
);

export default handler;
