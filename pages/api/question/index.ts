import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { addDefaultQuestionToSurvey } from '../../../api/question/question.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .post(requireSession, addDefaultQuestionToSurvey);

export default handler;
