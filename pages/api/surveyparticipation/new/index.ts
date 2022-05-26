import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../../backend/middleware/requireSession.middleware';
import { getNewParticipationsHandler } from '../../../../backend/surveyParticipation/surveyParticipation.controller';
import { nextConnectOptions } from '../../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  .get(requireSession, getNewParticipationsHandler)

export default handler;
