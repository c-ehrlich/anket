import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { handleDeleteQuestionResponse } from '../../../api/questionResponse/questionReponse.controller';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).delete(
  // no request body
  requireSession,
  handleDeleteQuestionResponse
);

export default handler;
