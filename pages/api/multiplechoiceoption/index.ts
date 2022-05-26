import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import { createMultipleChoiceOptionHandler } from '../../../backend/multipleChoiceOption/multipleChoiceOption.controller';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  // we're not using the request body here, so there is nothing to validate
  .post(requireSession, createMultipleChoiceOptionHandler);

export default handler;
