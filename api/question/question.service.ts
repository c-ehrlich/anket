import { QuestionType } from '@prisma/client';
import _logger from 'next-auth/lib/logger';
import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { QuestionResponse } from './question.schema';

export async function createDefaultQuestion({
  surveyId,
}: {
  surveyId: string;
}) {
  // find order
  const currentHighestOrder = await prisma.question.aggregate({
    _max: {
      order: true,
    },
    where: {
      surveyId,
    },
  });

  const order = typeof currentHighestOrder._max.order === 'number'
    ? currentHighestOrder._max.order + 1
    : 0;

  try {
    const question: QuestionResponse = await prisma.question.create({
      data: {
        surveyId,
        question: '',
        details: '',
        questionType: 'multipleChoiceMultiple',
        order,
      },
      include: {
        multipleChoiceOptions: true,
      },
    });
    return question;
  } catch (e) {
    logger.error(e);
  }
}

export async function editQuestion({
  id,
  data,
}: {
  id: string;
  data: Partial<
    Pick<
      QuestionResponse,
      'question' | 'details' | 'isRequired' | 'questionType'
    >
  >;
}) {
  // update stuff
  try {
    const updatedQuestion: QuestionResponse | undefined =
      await prisma.question.update({
        where: { id },
        data: { ...data },
        include: {
          multipleChoiceOptions: true,
        },
      });

    // delete other multiple choice options
    // TODO is this really necessary?
    if (
      !(
        updatedQuestion.questionType === 'multipleChoiceMultiple' ||
        updatedQuestion.questionType === 'multipleChoiceSingle'
      )
    ) {
      await prisma.multipleChoiceOption.deleteMany({
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
    const deletedQuestion: QuestionResponse = await prisma.question.delete({
      where: { id },
      include: {
        multipleChoiceOptions: true,
      },
    });

    // change order of all questions after this one
    await prisma.question.updateMany({
      where: {
        surveyId: deletedQuestion.surveyId,
        order: {
          gt: deletedQuestion.order,
        },
      },
      data: {
        order: { increment: -1 },
      },
    });

    return deletedQuestion;
  } catch (e) {
    logger.error(e);
  }
}
