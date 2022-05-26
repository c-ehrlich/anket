import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../backend/middleware/requireSession.middleware';
import { reorderMultipleChoiceOptionHandler } from '../../../../backend/multipleChoiceOption/multipleChoiceOption.controller';
import validateResource from '../../../../backend/middleware/validateResource.middleware';
import { reorderMultipleChoiceOptionSchema } from '../../../../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { nextConnectOptions } from '../../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(reorderMultipleChoiceOptionSchema),
  requireSession,
  reorderMultipleChoiceOptionHandler
);

export default handler;
