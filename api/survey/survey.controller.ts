import { Survey } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { CreateSurveyInput } from './survey.schema';
import {
  createNewSurvey,
  getAllSurveyPreviews,
  getAllSurveysWithQuestionsAndMultipleChoiceOptions,
} from './survey.service';

export async function createNewSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ survey: Partial<Survey> } | { message: string }>
) {
  const session = await getSession({ req });
  const authorId = session!.user!.id;
  const data: CreateSurveyInput = req.body;

  if (session && authorId === data.authorId) {
    console.log('...about to make survey');
    const survey = await createNewSurvey(data);
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
  const surveys = await getAllSurveyPreviews();

  return res.status(200).json(surveys);
}
