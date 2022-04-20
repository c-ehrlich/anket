import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import {
  deleteQuestionHandler,
  editQuestionHandler,
} from '../../../api/question/question.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .delete(requireSession, deleteQuestionHandler)
  .patch(requireSession, editQuestionHandler);

export default handler;
