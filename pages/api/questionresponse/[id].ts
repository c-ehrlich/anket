import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import { handleDeleteQuestionResponse } from '../../../backend/questionResponse/questionReponse.controller';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).delete(
  // no request body
  requireSession,
  handleDeleteQuestionResponse
);

export default handler;
