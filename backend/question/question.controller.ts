import { NextApiRequest, NextApiResponse } from 'next';
import APIErrorResponse from '../../types/APIErrorResponse';
import { getSurveyOwner } from '../survey/survey.service';
import getId from '../utils/getId';
import { EditQuestionData, QuestionFE } from './question.schema';
import {
  createDefaultQuestion,
  deleteQuestion,
  editQuestion,
  getQuestionOwner,
  reorderQuestion,
} from './question.service';

export async function addDefaultQuestionToSurvey(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE | APIErrorResponse>
) {
  const { surveyId }: { surveyId: string } = req.body;

  // make sure the user is allowed to modify that question/survey
  const surveyOwner = await getSurveyOwner(surveyId);
  if (surveyOwner?.authorId !== req.user.id) {
    return res.status(400).send({ error: 'Invalid user. Permission denied.' });
  }

  const question = await createDefaultQuestion({ surveyId });

  if (!question)
    return res.status(400).json({ error: 'Failed to create question' });

  return res.status(201).json(question);
}

export async function editQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE | APIErrorResponse>
) {
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  const data: EditQuestionData = req.body;

  // make sure the user is allowed to modify that question/survey
  const questionOwner = await getQuestionOwner(id);
  if (questionOwner?.survey.authorId !== req.user.id) {
    return res.status(400).send({ error: 'Invalid user. Permission denied.' });
  }

  // call a service that edits the question
  const editedQuestion: QuestionFE | undefined = await editQuestion({
    id,
    data,
  });

  // return the edited question (invalidate survey in frontend)
  if (!editedQuestion)
    return res.status(400).json({ error: 'failed to edit question' });
  return res.status(200).json(editedQuestion);
}

export async function deleteQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE | APIErrorResponse>
) {
  // make sure we have a questionid
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  // make sure the user is allowed to modify that question/survey
  const questionOwner = await getQuestionOwner(id);
  if (questionOwner?.survey.authorId !== req.user.id) {
    return res.status(400).send({ error: 'Invalid user. Permission denied.' });
  }

  // call a service that deletes the question (cascade the answersoptions)
  const deletedQuestion: QuestionFE | undefined = await deleteQuestion({
    id,
  });

  // return the deleted question (invalidate survey in frontend)
  if (!deletedQuestion)
    return res.status(400).json({ error: 'failed to delete question' });
  return res.status(200).json(deletedQuestion);
}

export async function reorderQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse<QuestionFE[] | APIErrorResponse>
) {
  // make sure we have a questionid
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  // make sure the user is allowed to modify that question/survey
  const questionOwner = await getQuestionOwner(id);
  if (questionOwner?.survey.authorId !== req.user.id) {
    return res.status(400).send({ error: 'Invalid user. Permission denied.' });
  }

  // get the new order from req
  const { order } = req.body;
  if (!order && order !== 0)
    return res.status(400).send({ error: 'failed to get order from body' });

  // call handler
  const reorderedQuestions: QuestionFE[] | undefined = await reorderQuestion({
    id,
    order,
  });

  // check if we have the object and return it or an error
  if (!reorderedQuestions)
    return res.status(400).json({ error: 'failed to reorder question' });
  return res.status(200).json(reorderedQuestions);
}
