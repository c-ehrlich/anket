import type { NextApiRequest, NextApiResponse } from 'next';
import NextConnectHandler from 'next-connect';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { createNewSurveyHandler, getAllSurveysHandler } from '../../../api/survey/survey.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  .get(requireSession, getAllSurveysHandler)
  .post(requireSession, createNewSurveyHandler);

export default handler;
