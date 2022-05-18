import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../../api/middleware/requireSession.middleware';
import { deleteAllSelectionsForQuestionHandler } from '../../../../api/multipleChoiceOptionSelection/multipleChoiceOptionSelection.controller';
import { nextConnectOptions } from '../../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).delete(
  // the only thing we're sending is an optional surveyId, so no point in validating
  // as with just one optional arg, an empty request is acceptable
  requireSession,
  deleteAllSelectionsForQuestionHandler
);

export default handler;
