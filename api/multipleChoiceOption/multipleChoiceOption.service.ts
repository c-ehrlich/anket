import logger from '../utils/logger';
import prisma from '../utils/prisma';

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

export async function editMultipleChoiceOptionName({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
  };
}) {
  try {
    const multipleChoiceOption = prisma.multipleChoiceOption.update({
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
