import prisma from '../utils/prisma';
import logger from '../utils/logger';
import {
  GetSurveyParticipationData,
  SurveyParticipationCore,
} from './surveyParticipation.schema';

export async function getOrCreateSurveyParticipation({
  userId,
  surveyId,
}: GetSurveyParticipationData) {
  // TODO make a separate function for when we know that the participation exists
  try {
    const participation = await prisma.surveyParticipation.upsert({
      where: {
        userId_surveyId: { userId, surveyId },
      },
      create: {
        surveyId,
        userId,
      },
      update: {},
    });
    if (!participation) throw new Error('failed to upsert surveyParticipation');

    const surveyWithParticipation = await prisma.survey.findUnique({
      where: {
        id: surveyId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        isPublic: true,
        isCompleted: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        participations: {
          where: {
            userId,
          },
          select: {
            id: true,
            isComplete: true,
          },
        },
        questions: {
          select: {
            id: true,
            order: true,
            question: true,
            questionType: true,
            details: true,
            isRequired: true,
            multipleChoiceOptions: {
              select: {
                id: true,
                name: true,
                order: true,
                multipleChoiceOptionSelections: {
                  where: {
                    surveyParticipationId: participation.id,
                  },
                  select: {
                    id: true,
                    selected: true,
                  }
                }
              },
            },
            questionResponses: {
              where: {
                surveyParticipationId: participation.id,
              },
              select: {
                id: true,
                answerBoolean: true,
                answerNumeric: true,
                answerText: true,
              },
            },
          },
        },
      },
    });

    return surveyWithParticipation;
  } catch (e: any) {
    logger.error(e);
  }
}

export async function getSurveyParticipationFromId(id: string) {
  try {
    const surveyParticipation: SurveyParticipationCore | null =
      await prisma.surveyParticipation.findUnique({
        where: { id },
      });
    return surveyParticipation;
  } catch (e) {
    logger.error(e);
  }
}
