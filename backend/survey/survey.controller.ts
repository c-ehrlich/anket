import { NextApiRequest, NextApiResponse } from 'next';
import APIErrorResponse from '../../types/APIErrorResponse';
import getId from '../utils/getId';
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
  res: NextApiResponse<SurveyFE | APIErrorResponse>
) {
  const authorId = req.user.id;

  const data: CreateSurvey = req.body;

  const survey = await createSurvey(data, authorId);
  if (!survey) {
    return res.status(400).json({ error: 'Error creating survey' });
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
  res: NextApiResponse<SurveyFE | APIErrorResponse>
) {
  const authorId = req.user.id;

  const data: CreateDefaultSurveyInput = { authorId };

  if (authorId === data.authorId) {
    const survey = await createDefaultSurvey(data);

    if (survey) {
      return res.status(201).json(survey);
    }
  }
  return res.status(400).json({ error: 'Failed to create survey' });
}

export async function getSingleSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyFEWithAuthor | APIErrorResponse>
) {
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  const survey = await getSingleSurvey(id);
  if (!survey) return res.status(400).json({ error: 'failed to find survey' });

  const authorId = req.user.id;

  // allowed if: we own it OR it's public and complete
  if (
    !(authorId === survey.author.id || (survey.isCompleted && survey.isPublic))
  ) {
    return res.status(400).json({ error: 'Not authorized to retrieve survey' });
  }

  return res.status(200).json(survey);
}

export async function getAllPublicSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<
    SurveyPreviewWithAuthorAndInteraction[] | APIErrorResponse
  >
) {
  const userId = getId(req) || req.user.id;

  const surveys: SurveyPreviewWithAuthorAndInteraction[] | undefined =
    await getAllPublicSurveyPreviews(userId);
  if (surveys === undefined)
    return res.status(400).json({ error: 'error getting surveys' });

  return res.status(200).json(surveys);
}

export async function getUserSurveysHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyPreviewWithAuthor[] | APIErrorResponse>
) {
  const userId = getId(req) || req.user.id;
  const surveys = await getUserSurveyPreviews(userId);
  return res.status(200).json(surveys);
}

export async function updateSurveyBasicInfoHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyFE | APIErrorResponse>
) {
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  // make sure the user is allowed to modify that survey
  const surveyOwner = await getSurveyOwner(id);
  if (surveyOwner?.authorId !== req.user.id) {
    return res.status(400).send({ error: 'Invalid user. Permission denied.' });
  }

  const data = req.body;

  const survey = await updateSurvey({ id, data });
  if (!survey)
    return res.status(400).json({ error: 'failed to update survey' });

  return res.status(200).json(survey);
}

export async function deleteSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse<SurveyFE | APIErrorResponse>
) {
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  // make sure the user is allowed to modify that survey
  const surveyOwner = await getSurveyOwner(id);
  if (surveyOwner?.authorId !== req.user.id) {
    return res.status(400).send({ error: 'Invalid user. Permission denied.' });
  }

  const deletedSurvey = await deleteSurvey({ id });
  if (!deletedSurvey)
    return res.status(400).json({ error: 'failed to delete survey' });

  return res.status(200).json(deletedSurvey);
}
