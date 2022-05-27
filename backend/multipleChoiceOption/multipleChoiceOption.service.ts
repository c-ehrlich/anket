import { Prisma } from '@prisma/client';
import logger from '../utils/logger';
import prisma from '../utils/prisma';
import {
  EditMultipleChoiceOptionData,
  MultipleChoiceOptionFE,
} from './multipleChoiceOption.schema';

export async function createDefaultMultipleChoiceOption({
  questionId,
}: {
  questionId: string;
}) {
  const currentHighestOrder = await prisma.multipleChoiceOption.aggregate({
    _max: {
      order: true,
    },
    where: {
      questionId,
    },
  });

  const order =
    typeof currentHighestOrder._max.order === 'number'
      ? currentHighestOrder._max.order + 1
      : 0;

  try {
    return prisma.multipleChoiceOption.create({
      data: { name: '', questionId, order },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function editMultipleChoiceOption({
  id,
  data,
}: {
  id: string;
  data: EditMultipleChoiceOptionData;
}) {
  try {
    return prisma.multipleChoiceOption.update({
      where: { id },
      data,
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function deleteMultipleChoiceOption({ id }: { id: string }) {
  try {
    const deletedOption = await prisma.multipleChoiceOption.delete({
      where: { id },
    });

    // change order of all multipleChoiceOptions after this one
    await prisma.multipleChoiceOption.updateMany({
      where: {
        questionId: deletedOption.questionId,
        order: {
          gt: deletedOption.order,
        },
      },
      data: {
        order: { decrement: 1 },
      },
    });

    return deletedOption;
  } catch (e) {
    logger.error(e);
  }
}

export async function deleteMultipleChoiceOptionsForQuestion({
  questionId,
}: {
  questionId: string;
}) {
  try {
    return prisma.multipleChoiceOption.deleteMany({
      where: { questionId },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function reorderMultipleChoiceOptions(options: {id: string, order: number}[]) {
  const transactionItems = ([] as Prisma.Prisma__MultipleChoiceOptionClient<MultipleChoiceOptionFE>[]);
  options.forEach(option => {
    const transactionItem = prisma.multipleChoiceOption.update({
      where: {
        id: option.id
      },
      data: {
        order: option.order
      },
      select: {
        id: true, name: true, order: true, 
      }
    })
    transactionItems.push(transactionItem);
  })
  return prisma.$transaction(transactionItems);
}

export async function getMultipleChoiceOptionOwner(id: string) {
  try {
    const option = await prisma.multipleChoiceOption.findUnique({
      where: { id },
      select: {
        question: {
          select: {
            survey: {
              select: {
                authorId: true,
              },
            },
          },
        },
      },
    });
    return option?.question.survey.authorId;
  } catch (e: any) {
    logger.error(e);
  }
}

export async function getQuestionTypeByMultipleChoiceOptionId(id: string) {
  try {
    const mco = await prisma.multipleChoiceOption.findUnique({
      where: { id },
      select: {
        question: {
          select: { questionType: true, id: true },
        },
      },
    });

    return mco?.question;
  } catch (e) {
    logger.error(e);
  }
}
