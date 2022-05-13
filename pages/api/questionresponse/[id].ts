import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { handleDeleteQuestionResponse } from '../../../api/questionResponse/questionReponse.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().delete(
  // no request body
  requireSession,
  handleDeleteQuestionResponse,
);

export default handler;
