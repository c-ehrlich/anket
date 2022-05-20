import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { getNewParticipationsHandler } from '../../../../api/surveyParticipation/surveyParticipation.controller';
import { nextConnectOptions } from '../../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  .get(requireSession, getNewParticipationsHandler)

export default handler;