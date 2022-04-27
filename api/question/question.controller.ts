import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from '../utils/logger';
import { EditQuestionData, QuestionFE } from './question.schema';
import {
  createDefaultQuestion,
  deleteQuestion,
  editQuestion,
  reorderQuestion,
} from './question.service';

export async function addDefaultQuestionToSurvey(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE | { message: string }>
) {
  // make sure we have a survey id and a user
  const session = await getSession({ req });
  const authorId = session!.user!.id;

  if (!authorId) {
    logger.error('no session');
    return res.status(400).json({ message: 'No session' });
  }

  const { surveyId }: { surveyId: string } = req.body;

  const question = await createDefaultQuestion({ surveyId });

  if (!question)
    return res.status(400).json({ message: 'Failed to create question' });

  return res.status(201).json(question);
}

export async function editQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE | { message: string }>
) {
  // make sure we have a questionid
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id)
    return res.status(400).json({ message: 'failed to get ID from query' });

  // get the data from the request
  const data: EditQuestionData = req.body;

  // TODO make sure the user is allowed to modify that question/survey

  // call a service that edits the question
  const editedQuestion: QuestionFE | undefined = await editQuestion({
    id,
    data,
  });

  // return the edited question (invalidate survey in frontend)
  if (!editedQuestion)
    return res.status(400).json({ message: 'failed to edit question' });
  return res.status(200).json(editedQuestion);
}

export async function deleteQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE | { message: string }>
) {
  // make sure we have a questionid
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id)
    return res.status(400).json({ message: 'failed to get ID from query' });

  // TODO make sure the user is allowed to modify that question/survey

  // call a service that deletes the question (cascade the answersoptions)
  const deletedQuestion: QuestionFE | undefined = await deleteQuestion({
    id,
  });

  // return the deleted question (invalidate survey in frontend)
  if (!deletedQuestion)
    return res.status(400).json({ message: 'failed to delete question' });
  return res.status(200).json(deletedQuestion);
}

export async function reorderQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE[] | { message: string }>
) {
  // make sure we have a questionid
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id)
    return res.status(400).json({ message: 'failed to get ID from query' });

  // TODO make sure the user is allowed to modify that question/survey

  // get the new order from req
  const { order } = req.body;
  if (!order && order !== 0)
    res.status(400).send({ message: 'failed to get order from body' });

  // call handler
  const reorderedQuestions: QuestionFE[] | undefined =
    await reorderQuestion({ id, order });

  // check if we have the object and return it or an error
  if (!reorderedQuestions)
    return res.status(400).json({ message: 'failed to reorder question' });
  return res.status(200).json(reorderedQuestions);
}
