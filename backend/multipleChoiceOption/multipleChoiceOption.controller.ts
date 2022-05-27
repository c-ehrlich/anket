import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import APIErrorResponse from '../../types/APIErrorResponse';
import { getQuestionOwner } from '../question/question.service';
import getId from '../utils/getId';
import logger from '../utils/logger';
import {
  EditMultipleChoiceOptionData,
  MultipleChoiceOptionFE,
} from './multipleChoiceOption.schema';
import {
  createDefaultMultipleChoiceOption,
  deleteMultipleChoiceOption,
  editMultipleChoiceOption,
  getMultipleChoiceOptionOwner,
  reorderMultipleChoiceOptions,
} from './multipleChoiceOption.service';

export async function createMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE | APIErrorResponse>
) {
  const { questionId }: { questionId: string } = req.body;
  if (!questionId) {
    logger.error('no questionId');
    return res.status(400).json({ error: 'No questionId' });
  }

  // make sure the user is allowed to modify that question
  const optionOwner = await getQuestionOwner(questionId);
  const session = await getSession({ req });
  if (!session?.user || optionOwner?.survey.authorId !== session.user.id) {
    return res
      .status(400)
      .send({ error: 'Invalid user. Permission denied.' });
  }

  const multipleChoiceOption = await createDefaultMultipleChoiceOption({
    questionId,
  });

  if (!multipleChoiceOption)
    return res
      .status(400)
      .json({ error: 'failed to create multiple choice option' });

  return res.status(201).json(multipleChoiceOption);
}

export async function deleteMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE | APIErrorResponse>
) {
  // make sure we have an id
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  // make sure the user is allowed to modify that question
  const optionOwner = await getMultipleChoiceOptionOwner(id);
  const session = await getSession({ req });
  if (!session?.user || optionOwner !== session.user.id) {
    return res
      .status(400)
      .send({ error: 'Invalid user. Permission denied.' });
  }

  // call a service that deletes the option
  const deletedOption: MultipleChoiceOptionFE | undefined =
    await deleteMultipleChoiceOption({ id });

  // return the deleted option (invalidate survey in frontend)
  if (!deletedOption)
    return res
      .status(400)
      .json({ error: 'failed to delete multiple choice option' });
  return res.status(200).json(deletedOption);
}

export async function editMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE | APIErrorResponse>
) {
  // make sure we have a questionid
  const id = getId(req);
  if (!id) {
    return res.status(400).json({ error: 'failed to get ID from query' });
  }

  // get the data from the request
  const data: EditMultipleChoiceOptionData = req.body;

  // make sure the user is allowed to modify that question
  const optionOwner = await getMultipleChoiceOptionOwner(id);
  const session = await getSession({ req });
  if (!session?.user || optionOwner !== session.user.id) {
    return res
      .status(400)
      .send({ error: 'Invalid user. Permission denied.' });
  }

  // call a service that edits the mcoption
  const editedMultipleChoiceOption: MultipleChoiceOptionFE | undefined =
    await editMultipleChoiceOption({
      id,
      data,
    });

  // return the edited mcoption (invalidate survey in frontend)
  if (!editedMultipleChoiceOption) {
    return res
      .status(400)
      .json({ error: 'failed to edit multiple choice option' });
  }
  return res.status(200).json(editedMultipleChoiceOption);
}

export async function reorderMultipleChoiceOptionsHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE[] | APIErrorResponse>
) {
  // TODO get questionID from request, then check permissions
  // idea 1: make sure:
  //   1. that question belongs to the user
  //   2. all the MCOs belong to that question
  // idea 2:
  //   1. make sure the user owns that question
  //   2. delete all answerOptions for that question
  //   3. make new ones based on the 

  let optionsToReorder: MultipleChoiceOptionFE[] = req.body;
  if (optionsToReorder.length === 0) return res.status(200).json([]);

  // create the objects that we want to end up with in db
  optionsToReorder.forEach((option, index) => {
    option.order = index;
  })
  
  const reorderedMultipleChoiceOptions: MultipleChoiceOptionFE[] =
    await reorderMultipleChoiceOptions(req.body);
  if (!reorderedMultipleChoiceOptions)
    return res
      .status(400)
      .json({ error: 'Failed to reorder Multiple Choice Options' });

  return res.status(200).json(reorderedMultipleChoiceOptions);
}
