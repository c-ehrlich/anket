import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import { addDefaultQuestionToSurvey } from '../../../backend/question/question.controller';
import { createQuestionSchema } from '../../../backend/question/question.schema';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).post(
  validateResource(createQuestionSchema),
  requireSession,
  addDefaultQuestionToSurvey
);

export default handler;
