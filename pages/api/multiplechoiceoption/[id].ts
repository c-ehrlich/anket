import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { deleteMultipleChoiceOptionHandler, editMultipleChoiceOptionHandler } from '../../../api/multipleChoiceOption/multipleChoiceOption.controller';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { editMultipleChoiceOptionSchema } from '../../../api/multipleChoiceOption/multipleChoiceOption.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  // delete doesn't have data so we don't need to validate schema
  .delete(requireSession, deleteMultipleChoiceOptionHandler)
  .patch(validateResource(editMultipleChoiceOptionSchema),requireSession, editMultipleChoiceOptionHandler);

export default handler;
