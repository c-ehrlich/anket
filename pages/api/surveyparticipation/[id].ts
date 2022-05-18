import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { getOrCreateSurveyParticipationHandler } from '../../../api/surveyParticipation/surveyParticipation.controller';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).get(requireSession, getOrCreateSurveyParticipationHandler);

export default handler;
