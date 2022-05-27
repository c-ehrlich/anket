import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import APIErrorResponse from '../../types/APIErrorResponse';
import getId from '../utils/getId';
import logger from '../utils/logger';
import {
  DashboardSurveyParticipation,
  SurveyWithParticipationAndUserResponses,
  UpdateSurveyParticipationResponse,
} from './surveyParticipation.schema';
import {
  getMySurveysParticipationSinceCount,
  getOrCreateSurveyParticipation,
  getSurveyParticipationPreviews,
  updateSurveyParticipation,
} from './surveyParticipation.service';

export async function getOrCreateSurveyParticipationHandler(
  req: NextApiRequest,
  res: NextApiResponse<
    SurveyWithParticipationAndUserResponses | APIErrorResponse
  >
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;

  if (!userId) {
    logger.error('no session');
    return res.status(400).json({ error: 'No session' });
  }

  const surveyId = getId(req);
  if (!surveyId) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  const surveyParticipation = await getOrCreateSurveyParticipation({
    surveyId,
    userId,
  });

  if (!surveyParticipation) {
    return res
      .status(400)
      .json({ error: 'Failed to retrieve or create Survey Participation' });
  }

  return res.status(200).json(surveyParticipation);
}

export async function getMySurveyParticipationsHandler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardSurveyParticipation[] | APIErrorResponse>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;
  if (!userId) {
    return res.status(400).json({ error: 'no session' });
  }

  const mySurveyParticipations: DashboardSurveyParticipation[] | undefined =
    await getSurveyParticipationPreviews({
      userId,
    });
  if (mySurveyParticipations === undefined) {
    return res
      .status(400)
      .json({ error: 'failed to get surveyParticipations' });
  }

  return res.status(200).send(mySurveyParticipations);
}

export async function getNewParticipationsHandler(
  req: NextApiRequest,
  res: NextApiResponse<number | APIErrorResponse>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;
  if (!userId) {
    return res.status(400).json({ error: 'no session' });
  }

  const sinceArg = Array.isArray(req.query.since)
    ? Number(req.query.since[0])
    : Number(req.query.since);
  const since = new Date(Date.now() - (sinceArg ? sinceArg : 0));

  const participations = await getMySurveysParticipationSinceCount({
    userId,
    since,
  });
  if (participations === undefined) {
    return res.status(400).json({ error: 'failed to get participations' });
  }

  return res.status(200).send(participations);
}

export async function updateSurveyParticipationHandler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateSurveyParticipationResponse | APIErrorResponse>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;
  if (!userId) {
    return res.status(400).json({ error: 'no session' });
  }

  const id = getId(req);

  const data = req.body;

  const updatedSurveyParticipation = await updateSurveyParticipation({
    id,
    data,
  });

  if (!updatedSurveyParticipation)
    return res
      .status(400)
      .json({ error: 'failed to update survey participation' });

  return res.status(200).json(updatedSurveyParticipation);
}