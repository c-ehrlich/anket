import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import { getMySurveyParticipationsHandler } from '../../../backend/surveyParticipation/surveyParticipation.controller';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  .get(requireSession, getMySurveyParticipationsHandler)

export default handler;
