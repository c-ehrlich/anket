import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import { updateQuestionResponseRequestSchema } from '../../../backend/questionResponse/questionResponse.schema';
import { handleUpsertQuestionResponse } from '../../../backend/questionResponse/questionReponse.controller';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(updateQuestionResponseRequestSchema),
  requireSession,
  handleUpsertQuestionResponse
);

export default handler;
