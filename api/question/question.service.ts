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

  const order =
    typeof currentHighestOrder._max.order === 'number'
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

export async function reorderQuestion({
  id,
  order,
}: {
  id: string;
  order: number;
}) {
  try {
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new Error(`Could not find question with id ${id}`);

    // if the orders are the same, we don't need to do anything
    if (order === question.order) {
      const unchangedQuestions = await prisma.question.findMany({
        where: {
          surveyId: question.surveyId,
        },
        include: {
          multipleChoiceOptions: true,
        },
      });
      return unchangedQuestions;
    }

    // TODO reimplement this function without this extra db call, should be possible with some prisma magic
    const questions = await prisma.question.findMany({
      where: { surveyId: question.surveyId },
    });
    if (!questions) throw new Error(`Could not find all questions`);

    if (order > question.order) {
      // make sure the new order isn't higher than the current max order
      // TODO we can probably just get this from the `questions` query
      const currentMaxOrder = questions.reduce((a, b) =>
        a.order > b.order ? a : b
      ).order;

      if (order > currentMaxOrder || order < 0)
        // TODO maybe instead just reorder to whatever the max order is?
        throw new Error(
          'You are trying to reorder further than the highest order'
        );

      // subtract 1 from all orders higher than this one but
      const shiftedOtherQuestions = await prisma.question.updateMany({
        where: {
          surveyId: question.surveyId,
          order: {
            gt: question.order,
            lte: order,
          },
        },
        data: {
          order: { increment: -1 },
        },
      });
      if (!shiftedOtherQuestions)
        throw new Error('failed to reorder other questions');
    } else {
      // make sure the new order isn't below 0
      if (order < 0)
        throw new Error('can not reorder a question to less than 0');

      // add 1 to all orders lower than this one
      const shiftedQuestions = await prisma.question.updateMany({
        where: {
          surveyId: question.surveyId,
          order: {
            lt: question.order,
            gte: order,
          },
        },
        data: {
          order: { increment: 1 },
        },
      });
      if (!shiftedQuestions)
        throw new Error('failed to reorder other questions');
    }

    // set this one to the new order
    const shiftedQuestion = await prisma.question.update({
      where: {
        id: question.id,
      },
      data: {
        order,
      },
    });
    if (!shiftedQuestion)
      throw new Error('failed to reorder the main question');

    // return _all_ questions for that survey
    const allQuestions = await prisma.question.findMany({
      where: {
        surveyId: question.surveyId,
      },
      include: {
        multipleChoiceOptions: true,
      },
    });
    
    return allQuestions;
  } catch (e: any) {
    logger.error(e);
  }
  return [];
}
