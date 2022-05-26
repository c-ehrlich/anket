import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../backend/middleware/requireSession.middleware';
import { deleteAllSelectionsForQuestionHandler } from '../../../../backend/multipleChoiceOptionSelection/multipleChoiceOptionSelection.controller';
import { nextConnectOptions } from '../../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).delete(
  // the only thing we're sending is an optional surveyId, so no point in validating
  // as with just one optional arg, an empty request is acceptable
  requireSession,
  deleteAllSelectionsForQuestionHandler
);

export default handler;
