import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../backend/middleware/requireSession.middleware';
import { getOrCreateSurveyParticipationHandler, updateSurveyParticipationHandler } from '../../../backend/surveyParticipation/surveyParticipation.controller';
import { nextConnectOptions } from '../../../backend/utils/nextConnect';
import validateResource from '../../../backend/middleware/validateResource.middleware';
import { updateSurveyParticipationDataSchema } from '../../../backend/surveyParticipation/surveyParticipation.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).put(requireSession, getOrCreateSurveyParticipationHandler)
.patch(requireSession, validateResource(updateSurveyParticipationDataSchema), updateSurveyParticipationHandler);

export default handler;
