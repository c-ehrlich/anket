import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { UpsertMultipleChoiceOptionResponseServiceInput } from './multipleChoiceOptionSelection.schema';

export async function upsertMultipleChoiceOptionSelection({
  surveyParticipationId,
  multipleChoiceOptionId,
  selected,
}: UpsertMultipleChoiceOptionResponseServiceInput) {
  try {
    return prisma.multipleChoiceOptionSelection.upsert({
      where: {
        surveyParticipationId_multipleChoiceOptionId: {
          surveyParticipationId,
          multipleChoiceOptionId,
        },
      },
      create: {
        surveyParticipationId,
        multipleChoiceOptionId,
        selected,
      },
      update: {
        selected,
      },
      select: {
        id: true,
        selected: true,
      },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function deleteMCSOptionsForQuestion({
  questionId,
  surveyParticipationId,
}: {
  questionId: string;
  surveyParticipationId: string;
}) {
  try {
    return prisma.multipleChoiceOptionSelection.deleteMany({
      where: {
        surveyParticipationId,
        multipleChoiceOption: {
          question: {
            id: questionId,
          },
        },
      },
    });
  } catch (e) {
    logger.error(e);
  }
}
