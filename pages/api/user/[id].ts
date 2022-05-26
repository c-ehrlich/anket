import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import { getUserProfileWithSurveysHandler } from '../../../backend/user/user.controller';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).get(requireSession, getUserProfileWithSurveysHandler);

export default handler;
