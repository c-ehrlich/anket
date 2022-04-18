import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { getUserSurveysHandler } from '../../../../api/survey/survey.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .get(requireSession, getUserSurveysHandler)

export default handler;
