import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import { upsertMultipleChoiceOptionResponseSchema } from '../../../backend/multipleChoiceOptionSelection/multipleChoiceOptionSelection.schema';
import { upsertMultipleChoiceOptionResponseHandler } from '../../../backend/multipleChoiceOptionSelection/multipleChoiceOptionSelection.controller';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(upsertMultipleChoiceOptionResponseSchema),
  requireSession,
  upsertMultipleChoiceOptionResponseHandler
);

export default handler;
