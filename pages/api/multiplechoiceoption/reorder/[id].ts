import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { reorderMultipleChoiceOptionHandler } from '../../../../api/multipleChoiceOption/multipleChoiceOption.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>().patch(
  requireSession,
  reorderMultipleChoiceOptionHandler
);

export default handler;
