import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import getId from '../utils/getId';
import logger from '../utils/logger';
import {
  CreateDefaultSurveyInput,
  CreateSurvey,
  SurveyFE,
  SurveyFEWithAuthor,
  SurveyPreviewWithAuthor,
  SurveyPreviewWithAuthorAndInteraction,
} from './survey.schema';
import {
  createSurvey,
  createDefaultSurvey,
  deleteSurvey,
  getAllPublicSurveyPreviews,
  getSingleSurvey,
  getSurveyOwner,
  getUserSurveyPreviews,
  updateSurvey,
} from './survey.service';

export async function createSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyFE | string>
) {
  logger.info('in createSurveyHandler');
  
  const session = await getSession({ req });
  const authorId = session!.user!.id;

  if (!authorId) {
    return res.status(400).send('No session');
  }

  const data: CreateSurvey = req.body;

  const survey = await createSurvey(data, authorId);
  if (!survey) {
    return res.status(400).send('Error creating survey')
  }

  return res.status(201).json(survey);
}

/*
 * This function was for when the create link made a new survey as soon as we clicked it
 * This has mostly been solved by having a small form before
 * Will leave this function here for now
 * TODO delete this function and associated service if we're sure we don't need it anymore
 */
export async function upsertEmptySurveyHandler(
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
  res: NextApiResponse<string | SurveyPreviewWithAuthorAndInteraction[]>
) {
  let userId = getId(req);
  if (!userId) {
    const session = await getSession({ req });
    userId = session!.user!.id;

    if (!userId) {
      logger.error('no session');
      return res.status(400).send('No session');
    }
  }

  const surveys: SurveyPreviewWithAuthorAndInteraction[] | undefined =
    await getAllPublicSurveyPreviews(userId);
  if (!surveys) return res.status(400).send('error getting surveys');

  console.log(surveys[0].participations[0]);

  return res.status(200).json(surveys);
}

export async function getUserSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | SurveyPreviewWithAuthor[]>
) {
  let userId = getId(req);
  if (!userId) {
    const session = await getSession({ req });
    userId = session!.user!.id;

    if (!userId) {
      logger.error('no session');
      return res.status(400).json({ message: 'No session' });
    }
  }

  console.log('user id: ' + userId);

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
  if (!session?.user || surveyOwner?.authorId !== session.user.id) {
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
  if (!session?.user || surveyOwner?.authorId !== session.user.id) {
    return res
      .status(400)
      .send({ message: 'Invalid user. Permission denied.' });
  }

  const deletedSurvey = await deleteSurvey({ id });
  if (!deletedSurvey)
    return res.status(400).json({ message: 'failed to delete survey' });

  return res.status(200).json(deletedSurvey);
}
