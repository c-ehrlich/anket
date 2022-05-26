import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import {
  deleteQuestionHandler,
  editQuestionHandler,
} from '../../../backend/question/question.controller';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import { editQuestionSchema } from '../../../backend/question/question.schema';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  // We don't send a request body on delete so there is nothing to validate
  .delete(requireSession, deleteQuestionHandler)
  .patch(
    validateResource(editQuestionSchema),
    requireSession,
    editQuestionHandler
  );

export default handler;
