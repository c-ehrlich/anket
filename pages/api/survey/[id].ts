import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import {
  deleteSurveyHandler,
  getSingleSurveyHandler,
  updateSurveyBasicInfoHandler,
} from '../../../backend/survey/survey.controller';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import { editSurveySchema } from '../../../backend/survey/survey.schema';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  .get(requireSession, getSingleSurveyHandler)
  .patch(
    validateResource(editSurveySchema),
    requireSession,
    updateSurveyBasicInfoHandler
  )
  // Delete doesn't send a request body so there are no schema to validate
  .delete(requireSession, deleteSurveyHandler);

export default handler;
