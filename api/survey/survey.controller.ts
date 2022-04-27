import { Survey } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from '../utils/logger';
import {
  CreateDefaultSurveyInput,
  SurveyFE,
  SurveyPreviewWithAuthor,
} from './survey.schema';
import {
  createDefaultSurvey,
  deleteSurvey,
  getAllPublicSurveyPreviews,
  getSingleSurvey,
  getUserSurveyPreviews,
  updateSurvey,
} from './survey.service';

export async function createNewSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyFE | { message: string }>
) {
  const session = await getSession({ req });
  const authorId = session!.user!.id;

  if (!authorId) {
    logger.error('no session');
    return res.status(400).json({ message: 'No session' });
  }

  const data: CreateDefaultSurveyInput = { authorId };

  if (session && authorId === data.authorId) {
    const survey = await createDefaultSurvey(data);

    if (survey) {
      return res.status(201).json(survey);
    }
  }
  return res.status(400).json({ message: 'Failed to create survey' });
}

export async function getSingleSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string} | SurveyFE>
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ message: 'failed to get ID from query'})

  const survey = await getSingleSurvey(id);

  if (!survey) return res.status(400).json({ message: "failed to find survey" })

  return res.status(200).json(survey);
}

export async function getAllPublicSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | SurveyPreviewWithAuthor[]>
) {
  const surveys = await getAllPublicSurveyPreviews();

  return res.status(200).json(surveys);
}

export async function getUserSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | SurveyPreviewWithAuthor[]>
) {
  const userId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  const surveys = await getUserSurveyPreviews(userId);
  return res.status(200).json(surveys);
}

export async function updateSurveyBasicInfoHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Survey>
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ message: 'failed to get ID from query'})
  
  const data = req.body;

  logger.info(data);

  const survey = await updateSurvey({ id, data });
  if (!survey)
    return res.status(400).json({ message: 'failed to update survey' });

  return res.status(200).json(survey);
}

export async function deleteSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: String } | Survey>
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ message: 'failed to get ID from query'})

  const deletedSurvey = await deleteSurvey({ id });
  if (!deletedSurvey) return res.status(400).json({ message: 'failed to delete survey' })

  return res.status(200).json(deletedSurvey);
}
