import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from '../utils/logger';
import { EditMultipleChoiceOptionData, MultipleChoiceOptionFE } from './multipleChoiceOption.schema';
import {
  createDefaultMultipleChoiceOption,
  deleteMultipleChoiceOption,
  editMultipleChoiceOption,
  reorderMultipleChoiceOption,
} from './multipleChoiceOption.service';

export async function createMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE | { message: string }>
) {
  const session = await getSession({ req });
  const authorId = session!.user!.id;

  if (!authorId) {
    logger.error('no session');
    return res.status(400).json({ message: 'No session' });
  }

  const { questionId }: { questionId: string } = req.body;
  if (!questionId) {
    logger.error('no questionId');
    return res.status(400).json({ message: 'No questionId' });
  }

  const multipleChoiceOption = await createDefaultMultipleChoiceOption({
    questionId,
  });

  if (!multipleChoiceOption)
    return res
      .status(400)
      .json({ message: 'failed to create multiple choice option' });

  return res.status(201).json(multipleChoiceOption);
}

export async function deleteMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE | { message: string }>
) {
  // make sure we have an id
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id)
    return res.status(400).json({ message: 'failed to get ID from query' });

  // TODO make sure the user is allowed to modify that option

  // call a service that deletes the option
  const deletedOption: MultipleChoiceOptionFE | undefined =
    await deleteMultipleChoiceOption({ id });

  // return the deleted option (invalidate survey in frontend)
  if (!deletedOption)
    return res
      .status(400)
      .json({ message: 'failed to delete multiple choice option' });
  return res.status(200).json(deletedOption);
}

export async function editMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE | { message: string }>
) {
  // make sure we have a questionid
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id)
    return res.status(400).json({ message: 'failed to get ID from query' });

  logger.info(`id: ${id}`);

  // get the data from the request
  const data: EditMultipleChoiceOptionData = req.body;

  logger.info(`data: ${JSON.stringify({...data})}`);

  // TODO make sure the user is allowed to modify that mcoption

  // call a service that edits the mcoption
  const editedMultipleChoiceOption: MultipleChoiceOptionFE | undefined =
    await editMultipleChoiceOption({
      id,
      data,
    });

  logger.info('edited mco:', editedMultipleChoiceOption);

  // return the edited mcoption (invalidate survey in frontend)
  if (!editedMultipleChoiceOption) {
    return res
      .status(400)
      .json({ message: 'failed to edit multiple choice option' });
  }
  return res.status(200).json(editedMultipleChoiceOption);
}

export async function reorderMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionFE[] | { message: string }>
) {
  // make sure we have an id
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id)
    return res.status(400).json({ message: 'failed to get ID from query' });

  // TODO make sure the user is allowed to modify that question

  // get the new order from req
  const { order } = req.body;
  if (!order && order !== 0) {
    res.status(400).send({ message: 'failed to get order from request body' });
  }

  // call handler
  const reorderedMultipleChoiceOptions:
    | MultipleChoiceOptionFE[]
    | undefined = await reorderMultipleChoiceOption({ id, order });

  // check if we have the object and return it or an error
  if (!reorderedMultipleChoiceOptions) {
    return res
      .status(400)
      .json({ message: 'failed to reorder multiple choice option' });
  }
  return res.status(200).json(reorderedMultipleChoiceOptions);
}
