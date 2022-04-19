import { QuestionType } from '@prisma/client';
import _logger from 'next-auth/lib/logger';
import logger from '../utils/logger';
import log from '../utils/logger';
import prisma from '../utils/prisma';

export async function createDefaultQuestion({
  surveyId,
}: {
  surveyId: string;
}) {
  try {
    const question = prisma.question.create({
      data: {
        surveyId,
        question: '',
        details: '',
        questionType: 'multipleChoiceMultiple',
      },
    });
    return question;
  } catch (e) {
    logger.error(e);
  }
}

export async function updateQuestion({
  id,
  question,
  details,
  isRequired,
  questionType,
}: {
  id: string;
  question?: string;
  details?: string;
  isRequired?: boolean;
  questionType?: QuestionType;
}) {
  // update stuff
  try {
    const updatedQuestion = prisma.question.update({
      where: { id },
      data: {
        question,
        details,
        isRequired,
        questionType,
      },
    });

    // delete
    if (
      !(
        questionType === 'multipleChoiceMultiple' ||
        questionType === 'multipleChoiceSingle'
      )
    ) {
      prisma.multipleChoiceOption.deleteMany({
        where: {
          questionId: id,
        },
      });
    }

    return updatedQuestion;
  } catch (e) {
    logger.error(e);
  }
}

export async function deleteQuestion({ id }: { id: string }) {
  try {
    const deletedQuestion = prisma.question.delete({
      where: { id },
    });

    return deletedQuestion
  } catch (e) {
    logger.error(e);
  }
}
