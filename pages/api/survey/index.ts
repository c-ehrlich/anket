import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import {
  upsertEmptySurveyHandler,
  getAllPublicSurveysHandler,
  createSurveyHandler,
} from '../../../backend/survey/survey.controller';
import { createSurveySchema } from '../../../backend/survey/survey.schema';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';

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
