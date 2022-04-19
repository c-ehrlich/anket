import { Survey } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
  CreateDefaultSurveyInput,
  CreateDefaultSurveyResponse,
} from './survey.schema';
import {
  createDefaultSurvey,
  getAllSurveyPreviews,
  getUserSurveyPreviews,
  updateSurvey,
} from './survey.service';

export async function createNewSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<CreateDefaultSurveyResponse | { message: string }>
) {
  const session = await getSession({ req });
  const authorId = session!.user!.id;

  if (!authorId) {
    console.error('no session');
    return res.status(400).json({ message: 'No session' });
  }

  const data: CreateDefaultSurveyInput = { authorId };

  if (session && authorId === data.authorId) {
    console.log('...about to make survey');
    const survey = await createDefaultSurvey(data);
    console.log(survey);

    if (survey) {
      return res.status(201).json(survey);
    }
  }
  return res.status(400).json({ message: 'Failed to create survey' });
}

export async function getAllSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Partial<Survey>[]>
) {
  const userId = req.query;
  console.log(userId);
  const surveys = await getAllSurveyPreviews();

  return res.status(200).json(surveys);
}

export async function getUserSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | Partial<Survey>[]>
) {
  const userId = Array.isArray(req.query) ? req.query[0] : req.query;
  console.log('id: ', userId);

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

  const survey = await updateSurvey({ id, data });
  if (!survey)
    return res.status(400).json({ message: 'failed to update survey' });
    
  return res.status(200).json(survey);
}
