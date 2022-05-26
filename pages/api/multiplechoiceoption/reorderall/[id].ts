import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../backend/middleware/requireSession.middleware';
import { reorderAllMultipleChoiceOptionsHandler } from '../../../../backend/multipleChoiceOption/multipleChoiceOption.controller';
import validateResource from '../../../../backend/middleware/validateResource.middleware';
import { reorderAllMultipleChoiceOptionsSchema } from '../../../../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { nextConnectOptions } from '../../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(reorderAllMultipleChoiceOptionsSchema),
  requireSession,
  reorderAllMultipleChoiceOptionsHandler
);

export default handler;
