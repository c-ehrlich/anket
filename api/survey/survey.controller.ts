import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import getId from '../utils/getId';
import logger from '../utils/logger';
import {
  CreateDefaultSurveyInput,
  SurveyFE,
  SurveyFEWithAuthor,
  SurveyPreviewWithAuthor,
} from './survey.schema';
import {
  createDefaultSurvey,
  deleteSurvey,
  getAllPublicSurveyPreviews,
  getSingleSurvey,
  getSurveyOwner,
  getUserSurveyPreviews,
  updateSurvey,
} from './survey.service';

export async function createNewSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyFE | { message: string }>
) {
  logger.info('in createNewsurveyHandler');

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
  res: NextApiResponse<{ message: string } | SurveyFEWithAuthor>
) {
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ message: 'failed to get ID from query' });
  }

  const survey = await getSingleSurvey(id);
  if (!survey)
    return res.status(400).json({ message: 'failed to find survey' });

  const session = await getSession({ req });

  // allowed if: we own it OR it's public and complete
  if (
    !(
      (session?.user && session.user.id === survey.author.id) ||
      (survey.isCompleted && survey.isPublic)
    )
  ) {
    return res
      .status(400)
      .json({ message: 'Not authorized to retrieve survey' });
  }

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
  const userId = getId(req);
  if (!userId) {
    return res.status(400).json({ message: 'failed to get ID from query ' });
  }

  const surveys = await getUserSurveyPreviews(userId);
  return res.status(200).json(surveys);
}

export async function updateSurveyBasicInfoHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | SurveyFE>
) {
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ message: 'failed to get ID from query' });
  }

  const data = req.body;

  // make sure the user is allowed to modify that survey
  const surveyOwner = await getSurveyOwner(id);
  const session = await getSession({ req });
  if (!session?.user || surveyOwner !== session.user.id) {
    return res
      .status(400)
      .send({ message: 'Invalid user. Permission denied.' });
  }

  const survey = await updateSurvey({ id, data });
  if (!survey)
    return res.status(400).json({ message: 'failed to update survey' });

  return res.status(200).json(survey);
}

export async function deleteSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: String } | SurveyFE>
) {
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ message: 'failed to get ID from query' });
  }

  // make sure the user is allowed to modify that survey
  const surveyOwner = await getSurveyOwner(id);
  const session = await getSession({ req });
  if (!session?.user || surveyOwner !== session.user.id) {
    return res
      .status(400)
      .send({ message: 'Invalid user. Permission denied.' });
  }

  const deletedSurvey = await deleteSurvey({ id });
  if (!deletedSurvey)
    return res.status(400).json({ message: 'failed to delete survey' });

  return res.status(200).json(deletedSurvey);
}
