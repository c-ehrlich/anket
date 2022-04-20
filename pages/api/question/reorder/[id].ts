import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { reorderQuestionHandler } from '../../../../api/question/question.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().patch(
  requireSession,
  reorderQuestionHandler
);

export default handler;
