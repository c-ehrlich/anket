import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { addDefaultQuestionToSurvey } from '../../../api/question/question.controller';
import { createQuestionSchema } from '../../../api/question/question.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().post(
  validateResource(createQuestionSchema),
  requireSession,
  addDefaultQuestionToSurvey
);

export default handler;
