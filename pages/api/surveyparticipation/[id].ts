import NextConnectHandler from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import requireSession from '../../../api/middleware/requireSession.middleware';
import { getOrCreateSurveyParticipationHandler, updateSurveyParticipationHandler } from '../../../api/surveyParticipation/surveyParticipation.controller';
import { nextConnectOptions } from '../../../api/utils/nextConnect';
import validateResource from '../../../api/middleware/validateResource.middleware';
import { updateSurveyParticipationDataSchema } from '../../../api/surveyParticipation/surveyParticipation.schema';

const handler = NextConnectHandler<NextApiRequest, NextApiResponse>(
  nextConnectOptions
).put(requireSession, getOrCreateSurveyParticipationHandler)
.patch(requireSession, validateResource(updateSurveyParticipationDataSchema), updateSurveyParticipationHandler);

export default handler;
