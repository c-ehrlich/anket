import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { createMultipleChoiceOptionHandler } from '../../../api/multipleChoiceOption/multipleChoiceOption.controller';
import { createDefaultMultipleChoiceOptionSchema } from '../../../api/multipleChoiceOption/multipleChoiceOption.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .post(validateResource(createDefaultMultipleChoiceOptionSchema), requireSession, createMultipleChoiceOptionHandler);

export default handler;
