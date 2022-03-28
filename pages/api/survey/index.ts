import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { createNewSurveyHandler, getAllSurveysHandler } from '../../../api/survey/survey.controller';
import { createSurveySchema } from '../../../api/survey/survey.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .get(requireSession, getAllSurveysHandler)
  .post(validateResource(createSurveySchema), requireSession, createNewSurveyHandler);

export default handler;
