import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { addDefaultMultipleChoiceOptionToQuestion } from '../../../api/multipleChoiceOption/multipleChoiceOption.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .post(requireSession, addDefaultMultipleChoiceOptionToQuestion);

export default handler;
