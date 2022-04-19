import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { createNewSurveyHandler, getAllPublicSurveysHandler } from '../../../api/survey/survey.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .get(requireSession, getAllPublicSurveysHandler)
  .post(requireSession, createNewSurveyHandler);

export default handler;
