// next: create the controller that either creates or gets a survey interaction
// we need:
// surveyId: from url
// userId: from next-auth

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from '../utils/logger';
import {
  GetSurveyParticipationData,
  SurveyParticipationFE,
} from './surveyParticipation.schema';
import { getOrCreateSurveyParticipation } from './surveyParticipation.service';

// get surveyId
// get userId
// service checks if one that meets those exists, if so gets it and all questionResponses
// if not, create it and return it

export async function getOrCreateSurveyParticipationHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyParticipationFE | { message: string }>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;
  
  if (!userId) {
    logger.error('no session');
    return res.status(400).json({ message: 'No session' });
  }

  const surveyId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  
  if (!surveyId)
    return res.status(400).json({ message: 'failed to get ID from query' });

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