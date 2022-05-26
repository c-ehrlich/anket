import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import {
  deleteMultipleChoiceOptionHandler,
  editMultipleChoiceOptionHandler,
} from '../../../backend/multipleChoiceOption/multipleChoiceOption.controller';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import { editMultipleChoiceOptionSchema } from '../../../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

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
