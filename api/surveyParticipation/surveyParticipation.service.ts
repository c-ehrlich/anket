import prisma from '../utils/prisma';
import logger from '../utils/logger';
import {
  DashboardSurveyParticipation,
  GetSurveyParticipationData,
  SurveyWithParticipationAndUserResponses,
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

    const surveyWithParticipation: SurveyWithParticipationAndUserResponses | null =
      await prisma.survey.findUnique({
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
                    },
                  },
                },
                orderBy: {
                  order: 'asc',
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
            orderBy: {
              order: 'asc',
            },
          },
        },
      });

    return surveyWithParticipation;
  } catch (e: any) {
    logger.error(e);
  }
}

export async function getSurveyParticipationId({
  userId,
  surveyId,
}: GetSurveyParticipationData) {
  try {
    const surveyParticipation = await prisma.surveyParticipation.findUnique({
      where: {
        userId_surveyId: {
          userId,
          surveyId,
        },
      },
      select: {
        id: true,
      },
    });
    const surveyParticipationId = surveyParticipation
      ? surveyParticipation.id
      : null;
    return surveyParticipationId;
  } catch (e) {
    logger.error(e);
  }
}

// TODO create schema/type
export async function getSurveyParticipationPreviews({
  userId,
  isComplete = undefined,
}: {
  userId: string;
  isComplete: boolean | undefined;
}): Promise<DashboardSurveyParticipation[] | undefined> {
  try {
    return prisma.surveyParticipation.findMany({
      where: {
        userId,
        survey: {
          isPublic: true,
          isCompleted: true,
        },
        isComplete,
      },
      select: {
        id: true,
        isComplete: true,
        survey: {
          select: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
            name: true,
            description: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function getMySurveysParticipationSinceCount({
  userId,
  since,
}: {
  userId: string;
  since: Date;
}) {
  try {
    return prisma.surveyParticipation.count({
      where: {
        survey: {
          authorId: userId,
        },
        updatedAt: {
          gte: since,
        },
      },
    });
  } catch (e) {
    logger.error(e);
  }
}
