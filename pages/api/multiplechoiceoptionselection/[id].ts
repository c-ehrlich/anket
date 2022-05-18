import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { upsertMultipleChoiceOptionResponseSchema } from '../../../api/multipleChoiceOptionSelection/multipleChoiceOptionSelection.schema';
import { upsertMultipleChoiceOptionResponseHandler } from '../../../api/multipleChoiceOptionSelection/multipleChoiceOptionSelection.controller';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(upsertMultipleChoiceOptionResponseSchema),
  requireSession,
  upsertMultipleChoiceOptionResponseHandler
);

export default handler;
