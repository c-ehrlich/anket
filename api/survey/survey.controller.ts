import { Survey } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { CreateSurveyInput } from './survey.schema';
import {
  createNewSurvey,
  getAllSurveysWithQuestionsAndMultipleChoiceOptions,
} from './survey.service';

export async function createNewSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; survey?: Partial<Survey> }>
) {
  const session = await getSession({ req });
  const authorId = session!.user!.id;
  const data: CreateSurveyInput = req.body;

  if (session && authorId === data.authorId) {
    console.log('...about to make survey');
    const survey = await createNewSurvey(data);
    console.log('survey:', survey);
    if (survey) {
      return res.status(201).json({ message: 'Survey created', survey });
    }
  }
  return res.status(400).json({ message: 'Failed to create survey' });
}

export async function getAllSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; surveys: Survey[] }>
) {
  const surveys = await getAllSurveysWithQuestionsAndMultipleChoiceOptions();

  return res.status(200).json({ message: 'Surveys', surveys });
  return surveys;
}
