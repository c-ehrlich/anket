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
  try {
    const question: QuestionResponse = await prisma.question.create({
      data: {
        surveyId,
        question: '',
        details: '',
        questionType: 'multipleChoiceMultiple',
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
      include: {
        multipleChoiceOptions: true,
      },
    });

    return deletedQuestion;
  } catch (e) {
    logger.error(e);
  }
}
