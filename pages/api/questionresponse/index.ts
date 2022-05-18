import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { updateQuestionResponseRequestSchema } from '../../../api/questionResponse/questionResponse.schema';
import { handleUpsertQuestionResponse } from '../../../api/questionResponse/questionReponse.controller';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(updateQuestionResponseRequestSchema),
  requireSession,
  handleUpsertQuestionResponse
);

export default handler;
