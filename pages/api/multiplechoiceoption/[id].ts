import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import {
  deleteMultipleChoiceOptionHandler,
  editMultipleChoiceOptionHandler,
} from '../../../api/multipleChoiceOption/multipleChoiceOption.controller';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { editMultipleChoiceOptionSchema } from '../../../api/multipleChoiceOption/multipleChoiceOption.schema';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  // delete doesn't have data so we don't need to validate schema
  .delete(requireSession, deleteMultipleChoiceOptionHandler)
  .patch(
    validateResource(editMultipleChoiceOptionSchema),
    requireSession,
    editMultipleChoiceOptionHandler
  );

export default handler;
