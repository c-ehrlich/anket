import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../backend/middleware/requireSession.middleware';
import validateResource from '../../../../backend/middleware/validateResource.middleware';
import { reorderMultipleChoiceOptionsSchema } from '../../../../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { nextConnectOptions } from '../../../../backend/utils/nextConnect';
import { reorderMultipleChoiceOptionsHandler } from '../../../../backend/multipleChoiceOption/multipleChoiceOption.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(reorderMultipleChoiceOptionsSchema),
  requireSession,
  reorderMultipleChoiceOptionsHandler
);

export default handler;
