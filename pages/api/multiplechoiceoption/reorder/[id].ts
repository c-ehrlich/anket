import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { reorderMultipleChoiceOptionHandler } from '../../../../api/multipleChoiceOption/multipleChoiceOption.controller';
import validateResource from '../../../../api/middleware/validateResource.middleware';
import { reorderMultipleChoiceOptionSchema } from '../../../../api/multipleChoiceOption/multipleChoiceOption.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().patch(
  validateResource(reorderMultipleChoiceOptionSchema),
  requireSession,
  reorderMultipleChoiceOptionHandler
);

export default handler;
