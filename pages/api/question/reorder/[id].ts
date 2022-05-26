import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../backend/middleware/requireSession.middleware';
import { reorderQuestionHandler } from '../../../../backend/question/question.controller';
import validateResource from '../../../../backend/middleware/validateResource.middleware';
import { reorderQuestionSchema } from '../../../../backend/question/question.schema';
import { nextConnectOptions } from '../../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(reorderQuestionSchema),
  requireSession,
  reorderQuestionHandler
);

export default handler;
