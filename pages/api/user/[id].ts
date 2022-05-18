import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { getUserProfileWithSurveysHandler } from '../../../api/user/user.controller';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).get(requireSession, getUserProfileWithSurveysHandler);

export default handler;
