import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { getOrCreateSurveyParticipationHandler } from '../../../api/surveyParticipation/surveyParticipation.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().get(
  requireSession,
  getOrCreateSurveyParticipationHandler
);

export default handler;
