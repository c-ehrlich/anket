import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { MultipleChoiceOptionSelectionFE, UpsertMultipleChoiceOptionResponseServiceInput } from './multipleChoiceOptionSelection.schema';

export async function upsertMultipleChoiceOptionSelection({
  surveyParticipationId,
  multipleChoiceOptionId,
  selected,
}: UpsertMultipleChoiceOptionResponseServiceInput) {
  try {
    const mcoResponse: MultipleChoiceOptionSelectionFE = await prisma.multipleChoiceOptionSelection.upsert({
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
      }
    });

    return mcoResponse;
  } catch (e) {
    logger.error(e);
  }
}
