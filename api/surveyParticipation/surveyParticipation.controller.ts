import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import getId from '../utils/getId';
import logger from '../utils/logger';
import { SurveyWithParticipationAndUserResponses } from './surveyParticipation.schema';
import { getOrCreateSurveyParticipation } from './surveyParticipation.service';

export async function getOrCreateSurveyParticipationHandler(
  req: NextApiRequest,
  res: NextApiResponse<
    SurveyWithParticipationAndUserResponses | { message: string }
  >
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;

  if (!userId) {
    logger.error('no session');
    return res.status(400).json({ message: 'No session' });
  }

  const surveyId = getId(req);
  if (!surveyId) {
    return res.status(400).json({ message: 'failed to get ID from query' });
  }

  const surveyParticipation = await getOrCreateSurveyParticipation({
    surveyId,
    userId,
  });

  if (!surveyParticipation) {
    return res
      .status(400)
      .json({ message: 'Failed to retrieve or create Survey Participation' });
  }

  return res.status(200).json(surveyParticipation);
}
