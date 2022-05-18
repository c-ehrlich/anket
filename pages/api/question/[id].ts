import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import {
  deleteQuestionHandler,
  editQuestionHandler,
} from '../../../api/question/question.controller';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { editQuestionSchema } from '../../../api/question/question.schema';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

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
