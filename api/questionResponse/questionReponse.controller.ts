import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
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
  res: NextApiResponse<QuestionResponseFE | string>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;

  if (!userId) {
    return res.status(400).send('no userId');
  }

  // get stuff from the request
  const data: UpdateQuestionResponseRequest = req.body;

  // TODO make sure we have permission

  const questionResponse: QuestionResponseFE | undefined =
    await upsertQuestionResponse({
      ...data,
    });

  if (!questionResponse) {
    return res.status(400).send('failed to update questionresponse');
  }

  return res.status(200).json(questionResponse);
}

export async function handleDeleteQuestionResponse(
  req: NextApiRequest,
  res: NextApiResponse<QuestionResponseFE | string>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;

  const id = getId(req);

  // check if the questionResponse exists
  const questionResponse = await getQuestionResponseById(id);
  if (!questionResponse) {
    res.status(200).send('Seems like this is already deleted');
  }

  // check if user has permission to delete it
  if (userId !== questionResponse!.surveyParticipation.user.id) {
    return res.status(400).send('unauthorized');
  }

  const deletedQuestionResponse: QuestionResponseFE | undefined =
    await deleteQuestionResponseById(id);

  if (!deletedQuestionResponse) {
    return res.status(400).send('failed to delete questionResponse');
  }

  return res.status(200).json(deletedQuestionResponse);
}
