import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { getUserSurveysHandler } from '../../../../api/survey/survey.controller';
import { nextConnectOptions } from '../../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).get(requireSession, getUserSurveysHandler);

export default handler;
