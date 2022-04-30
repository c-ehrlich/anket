import { Id } from 'tabler-icons-react';
import logger from '../utils/logger';
import prisma from '../utils/prisma';
import {
  EditMultipleChoiceOptionData,
  MultipleChoiceOptionFE,
  ReorderAllMultipleChoiceOptionsData,
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
    const multipleChoiceOption = prisma.multipleChoiceOption.create({
      data: { name: '', questionId, order },
    });

    return multipleChoiceOption;
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
    const multipleChoiceOption = await prisma.multipleChoiceOption.update({
      where: { id },
      data,
    });

    return multipleChoiceOption;
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
        questionId: (await deletedOption).questionId,
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
    const deletedOptions = prisma.multipleChoiceOption.deleteMany({
      where: { questionId },
    });

    return deletedOptions;
  } catch (e) {
    logger.error(e);
  }
}

export async function reorderMultipleChoiceOption({
  id,
  order,
}: {
  id: string;
  order: number;
}) {
  try {
    const option = await prisma.multipleChoiceOption.findUnique({
      where: { id },
    });
    if (!option) throw new Error(`Could not find option ${id}`);

    // if the orders are the same, we don't need to do anything
    if (order === option.order) {
      const unchangedOptions = await prisma.multipleChoiceOption.findMany({
        where: { questionId: option.questionId },
        orderBy: {
          order: 'asc',
        },
      });
      return unchangedOptions;
    }

    // TODO reimplement this function without this extra db call, should be possible...
    const options = await prisma.multipleChoiceOption.findMany({
      where: { questionId: option.questionId },
    });
    if (!options) throw new Error('Could not find all the options');

    if (order > option.order) {
      // make sure the new order isn't higher than the current max order
      const currentMaxOrder = options.reduce((a, b) =>
        a.order > b.order ? a : b
      ).order;

      if (order > currentMaxOrder)
        // TODO maybe instead just reorder to whatever the max order is?
        throw new Error(
          'You are trying to reorder further than the highest order'
        );

      const shiftedOtherOptions = await prisma.multipleChoiceOption.updateMany({
        where: {
          questionId: option.questionId,
          order: {
            gt: option.order,
            lte: order,
          },
        },
        data: {
          order: { decrement: 1 },
        },
      });
      if (!shiftedOtherOptions)
        throw new Error('failed to reorder other options');
    } else {
      // make sure the new order isn't below 0
      // TODO: maybe just change the order to 0 instead?
      if (order < 0) throw new Error('can not reorder to less than 0');

      // add 1 to all orders lower than this one
      const shiftedOtherOptions = await prisma.multipleChoiceOption.updateMany({
        where: {
          questionId: option.questionId,
          order: {
            lt: option.order,
            gte: order,
          },
        },
        data: {
          order: { increment: 1 },
        },
      });
      if (!shiftedOtherOptions)
        throw new Error('failed to reorder other options');
    }

    // set this one to the new order
    const shiftedOption = await prisma.multipleChoiceOption.update({
      where: { id: option.id },
      data: { order },
    });
    if (!shiftedOption) throw new Error('failed to reorder the main option');

    // return _all_ options for that question
    const allOptions = await prisma.multipleChoiceOption.findMany({
      where: { questionId: option.questionId },
      orderBy: {
        order: 'asc',
      },
    });
    return allOptions;
  } catch (e: any) {
    logger.error(e);
  }
}

export async function reorderAllMultipleChoiceOptions(
  questionId: string,
  data: ReorderAllMultipleChoiceOptionsData
) {
  // make sure that
  // 1. we have all multiple choice options of that question (ids)
  // 2. we don't have any IDs that do not belong to MCOs of that question
  //    (just check that they're the same length)
  // 3. the order numbers start at 0 and increase from there
  try {
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        multipleChoiceOptions: true,
      },
    });

    if (!question) throw new Error('Failed to find question');

    if (data.length !== question.multipleChoiceOptions.length) {
      throw new Error('Invalid data length');
    }

    for (let i = 0; i < data.length; i++) {
      if (data.findIndex((a) => a.order === i) === -1) {
        throw new Error(`Failed to find item with index ${i}`);
      }
    }

    logger.info('new order is ok');

    for (const item of data) {
      const updatedItem = await prisma.multipleChoiceOption.update({
        where: { id: item.id },
        data: { order: item.order },
        select: {
          id: true,
          name: true,
          order: true,
        }
      });
      logger.info(updatedItem);
    }

    const allMultipleChoiceOptionsForQuestion =
      await prisma.multipleChoiceOption.findMany({
        where: { questionId },
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name: true,
          order: true,
        }
      });

    logger.info(allMultipleChoiceOptionsForQuestion);

    return allMultipleChoiceOptionsForQuestion;
  } catch (e: any) {
    logger.error(e);
  }
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
