import { NextApiRequest, NextApiResponse } from 'next';
import APIErrorResponse from '../../types/APIErrorResponse';
import getId from '../utils/getId';
import {
  QuestionResponseFE,
  UpdateQuestionResponseRequest,
} from './questionResponse.schema';
import {
  deleteQuestionResponseById,
  getQuestionResponseById,
  upsertQuestionResponse,
} from './questionResponse.service';

export async function handleUpsertQuestionResponse(
  req: NextApiRequest,
  res: NextApiResponse<QuestionResponseFE | APIErrorResponse>
) {
  const data: UpdateQuestionResponseRequest = req.body;

  // TODO make sure we have permission

  const questionResponse: QuestionResponseFE | undefined =
    await upsertQuestionResponse({
      ...data,
    });

  if (!questionResponse) {
    return res.status(400).json({ error: 'failed to update questionresponse' });
  }

  return res.status(200).json(questionResponse);
}

export async function handleDeleteQuestionResponse(
  req: NextApiRequest,
  res: NextApiResponse<QuestionResponseFE | APIErrorResponse>
) {
  const id = getId(req);

  // check if the questionResponse exists
  const questionResponse = await getQuestionResponseById(id);
  if (!questionResponse) {
    res.status(400).json({ error: 'Seems like this is already deleted' });
  }

  // check if user has permission to delete it
  if (questionResponse!.surveyParticipation.user.id !== req.user.id) {
    return res.status(400).json({ error: 'unauthorized' });
  }

  const deletedQuestionResponse: QuestionResponseFE | undefined =
    await deleteQuestionResponseById(id);

  if (!deletedQuestionResponse) {
    return res.status(400).json({ error: 'failed to delete questionResponse' });
  }

  return res.status(200).json(deletedQuestionResponse);
}
