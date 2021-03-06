import { NextApiRequest, NextApiResponse } from 'next';
import APIErrorResponse from '../../types/APIErrorResponse';
import getId from '../utils/getId';
import logger from '../utils/logger';
import { SurveyStatsResponse } from './surveyStats.schema';
import { getSurveyStats } from './surveyStats.service';

export async function getSurveyStatsHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyStatsResponse | APIErrorResponse>
) {
  const id = getId(req);
  const surveyStats: SurveyStatsResponse | undefined | null =
    await getSurveyStats(id);
  if (!surveyStats) {
    logger.error(`Error getting survey with interactions. Survey ID: ${id}`);
    return res
      .status(400)
      .json({ error: 'error getting survey with interactions' });
  }

  if (surveyStats.author.id !== req.user.id) {
    return res.status(400).json({ error: 'Invalid user. Permission denied.' });
  }

  return res.status(200).json(surveyStats);
}
