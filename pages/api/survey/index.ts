import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import {
  createNewSurveyHandler,
  getAllPublicSurveysHandler,
} from '../../../api/survey/survey.controller';
import { nextConnectOptions } from '../../../api/utils/nextConnect';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
)
  .get(requireSession, getAllPublicSurveysHandler)
  .put(requireSession, createNewSurveyHandler);

export default handler;
