import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';
import { getSurveyStatsHandler } from '../../../backend/surveyStats/surveyStats.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).get(requireSession, getSurveyStatsHandler);

export default handler;
