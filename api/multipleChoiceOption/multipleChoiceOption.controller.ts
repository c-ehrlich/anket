import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from '../utils/logger';
import { MultipleChoiceOptionResponse } from './multipleChoiceOption.schema';
import { createDefaultMultipleChoiceOption } from './multipleChoiceOption.service';

export async function addDefaultMultipleChoiceOptionToQuestion(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionResponse | { message: string }>
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
  res: NextApiResponse<MultipleChoiceOptionResponse | { message: string }>
) {
  return res.status(400).json({ message: 'todo' });
}

export async function editMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionResponse | { message: string }>
) {
  return res.status(400).json({ message: 'todo' });
}

export async function reorderMultipleChoiceOptionHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionResponse[] | { message: string }>
) {
  return res.status(400).json({ message: 'todo' });
}
