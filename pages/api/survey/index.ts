import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import validateResource from '../../../api/middleware/validateResource.middleware';
import {
  upsertEmptySurveyHandler,
  getAllPublicSurveysHandler,
  createSurveyHandler,
} from '../../../api/survey/survey.controller';
import { createSurveySchema } from '../../../api/survey/survey.schema';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  .get(requireSession, getAllPublicSurveysHandler)
  .put(requireSession, upsertEmptySurveyHandler)
  .post(
    requireSession,
    validateResource(createSurveySchema),
    createSurveyHandler
  );

export default handler;
