
import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import requireSession from '../../../api/middleware/requireSession.middleware';
import { getSingleSurveyHandler, updateSurveyBasicInfoHandler } from '../../../api/survey/survey.controller';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>()
  // TODO validate schema
  .get(requireSession, getSingleSurveyHandler)
  .patch(requireSession, updateSurveyBasicInfoHandler)
  // .delete(requireSession, validateResource(), handler)  

export default handler;
