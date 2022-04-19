import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from '../utils/logger';
import { QuestionResponse } from './question.schema';
import { createDefaultQuestion } from './question.service';

export async function addDefaultQuestionToSurvey(
  req: NextApiRequest,
  res: NextApiResponse<QuestionResponse | { message: string }>
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

export async function moveQuestionToPosition(
  questionId: string,
  position: number
) {
  // make sure we have a question id, a position, a user
  // make sure the user is allowed to modify that survey
  // call a service that reorders the questions
  // return the question (invalidate survey in frontend)
}

export async function deleteQuestion(questionId: string) {
  // make sure we have a questionid
  // make sure the user is allowed to modify that question/survey
  // call a service that deletes the question (cascade the answersoptions)
  // return the deleted question (invalidate survey in frontend)
}
