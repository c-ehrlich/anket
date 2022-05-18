import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { reorderAllMultipleChoiceOptionsHandler } from '../../../../api/multipleChoiceOption/multipleChoiceOption.controller';
import validateResource from '../../../../api/middleware/validateResource.middleware';
import { reorderAllMultipleChoiceOptionsSchema } from '../../../../api/multipleChoiceOption/multipleChoiceOption.schema';
import { nextConnectOptions } from '../../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).patch(
  validateResource(reorderAllMultipleChoiceOptionsSchema),
  requireSession,
  reorderAllMultipleChoiceOptionsHandler
);

export default handler;
