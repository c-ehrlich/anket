import { Survey } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import log from '../utils/logger';
import { CreateDefaultSurveyInput, CreateDefaultSurveyResponse } from './survey.schema';
import {
  createDefaultSurvey,
  getAllSurveyPreviews,
  getUserSurveyPreviews,
} from './survey.service';

export async function createNewSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ survey: CreateDefaultSurveyResponse } | { message: string }>
) {
  const session = await getSession({ req });
  const authorId = session!.user!.id;
  const data: CreateDefaultSurveyInput = req.body;

  if (session && authorId === data.authorId) {
    console.log('...about to make survey');
    const survey = await createDefaultSurvey(data);
    console.log('survey:', survey);
    if (survey) {
      return res.status(201).json({ survey });
    }
  }
  return res.status(400).json({ message: 'Failed to create survey' });
}

export async function getAllSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Partial<Survey>[] >
) {
  const userId = req.query
  console.log(userId);
  const surveys = await getAllSurveyPreviews();

  return res.status(200).json(surveys);
}

export async function getUserSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Partial<Survey>[] >
) {
  const userId = (Array.isArray(req.query)) ? req.query[0] : req.query;
  console.log('id: ', userId);

  const surveys = await getUserSurveyPreviews(userId)
  return res.status(200).json(surveys);
}
