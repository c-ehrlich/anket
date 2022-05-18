import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { reorderQuestionHandler } from '../../../../api/question/question.controller';
import validateResource from '../../../../api/middleware/validateResource.middleware';
import { reorderQuestionSchema } from '../../../../api/question/question.schema';
import { nextConnectOptions } from '../../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(reorderQuestionSchema),
  requireSession,
  reorderQuestionHandler
);

export default handler;
