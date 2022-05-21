import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { nextConnectOptions } from '../../../api/utils/nextConnect';
import { getSurveyStatsHandler } from '../../../api/surveyStats/surveyStats.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).get(requireSession, getSurveyStatsHandler);

export default handler;
