import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../../backend/middleware/requireSession.middleware';
import { getUserSurveysHandler } from '../../../../backend/survey/survey.controller';
import { nextConnectOptions } from '../../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).get(requireSession, getUserSurveysHandler);

export default handler;
