import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { MultipleChoiceOptionResponse } from './multipleChoiceOption.schema';

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
  data: Partial<Pick<MultipleChoiceOptionResponse, 'name'>>;
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
    });
    return allOptions;
  } catch (e: any) {
    logger.error(e);
  }
}
