import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { deleteQuestionHandler } from '../../../api/question/question.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().delete(
  requireSession,
  deleteQuestionHandler
);

export default handler;
