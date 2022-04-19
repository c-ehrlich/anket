import log from '../utils/logger';
import prisma from '../utils/prisma';

export async function createDefaultMultipleChoiceOption({
  questionId,
}: {
  questionId: string;
}) {
  try {
    const multipleChoiceOption = prisma.multipleChoiceOption.create({
      data: { name: '', questionId },
    });

    return multipleChoiceOption;
  } catch (e) {
    console.error(e);
  }
}

export async function updateMultipleChoiceOptionName({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  try {
    const multipleChoiceOption = prisma.multipleChoiceOption.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return multipleChoiceOption;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteMultipleChoiceOption({ id }: { id: string }) {
  try {
    const deletedOption = prisma.multipleChoiceOption.delete({ where: { id } });

    return deletedOption;
  } catch (e) {
    console.error(e);
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
    console.error(e);
  }
}