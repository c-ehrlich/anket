import { Question, QuestionType } from '@prisma/client';
import _logger from 'next-auth/lib/logger';
import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { QuestionResponse } from './question.schema';

export async function createDefaultQuestion({
  surveyId,
}: {
  surveyId: string;
}) {
  try {
    const question: QuestionResponse = await prisma.question.create({
      data: {
        surveyId,
        question: '',
        details: '',
        questionType: 'multipleChoiceMultiple',
      },
      include: {
        multipleChoiceOptions: true
      }
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
