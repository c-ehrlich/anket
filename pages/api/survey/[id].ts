import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import {
  deleteSurveyHandler,
  getSingleSurveyHandler,
  updateSurveyBasicInfoHandler,
} from '../../../api/survey/survey.controller';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { editSurveySchema } from '../../../api/survey/survey.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .get(requireSession, getSingleSurveyHandler)
  .patch(
    validateResource(editSurveySchema),
    requireSession,
    updateSurveyBasicInfoHandler
  )
  // Delete doesn't send a request body so there are no schema to validate
  .delete(requireSession, deleteSurveyHandler);

export default handler;
