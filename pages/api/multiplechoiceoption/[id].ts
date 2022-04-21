import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { deleteMultipleChoiceOptionHandler, editMultipleChoiceOptionHandler } from '../../../api/multipleChoiceOption/multipleChoiceOption.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  // TODO validate schema
  .delete(requireSession, deleteMultipleChoiceOptionHandler)
  .patch(requireSession, editMultipleChoiceOptionHandler);

export default handler;
