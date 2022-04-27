import {
  CreateDefaultSurveyInput,
  SurveyFE,
} from './survey.schema';
import prisma from '../utils/prisma';
import { Survey } from '@prisma/client';
import logger from '../utils/logger';

export async function createDefaultSurvey(data: CreateDefaultSurveyInput) {
  /**
   * We don't want to inadventently create a bunch of surveys. So if there is
   * an existing survey that has not been edited at all from the default, return
   * that instead of creating a new one...
   */
  try {
    const existingSurvey: SurveyFE | null =
      await prisma.survey.findFirst({
        where: {
          name: '',
          description: '',
          authorId: data.authorId,
          questions: {
            none: {},
          },
        },
        include: {
          questions: {
            include: {
              multipleChoiceOptions: {
                orderBy: {
                  order: 'asc',
                },
              },
            },
            orderBy: {
              order: 'asc',
            },
          },
        },
      });

    if (existingSurvey) return existingSurvey;
  } catch (e: any) {
    logger.error(e);
  }

  // ...If not, create one
  try {
    const survey: SurveyFE = await prisma.survey.create({
      data: {
        ...data,
        name: '',
        description: '',
      },
      include: {
        questions: {
          include: {
            multipleChoiceOptions: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return survey;
  } catch (e) {
    logger.error(e);
  }
}

export async function getAllPublicSurveyPreviews() {
  const surveys = await prisma.survey.findMany({
    where: {
      isCompleted: true,
      isPublic: true,
    },
    select: {
      author: { select: { id: true, name: true, image: true } },
      id: true,
      name: true,
      description: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return surveys;
}

export async function getUserSurveyPreviews(authorId: string) {
  const surveys = await prisma.survey.findMany({
    where: {
      authorId,
    },
    select: {
      author: { select: { id: true, name: true, image: true } },
      id: true,
      name: true,
      description: true,
      isCompleted: true,
      isPublic: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return surveys;
}

export async function getSingleSurvey(id: string) {
  try {
    const survey = await prisma.survey.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            multipleChoiceOptions: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return survey;
  } catch (e: any) {
    logger.error(e);
  }
}

export async function updateSurvey({
  id,
  data,
}: {
  id: string;
  data: Partial<Survey>;
}) {
  try {
    const updatedSurvey = await prisma.survey.update({
      where: { id },
      data,
      include: {
        questions: {
          include: {
            multipleChoiceOptions: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return updatedSurvey;
  } catch (e: any) {
    logger.error(e);
  }
}

export async function deleteSurvey({ id }: { id: string }) {
  try {
    const deletedSurvey = await prisma.survey.delete({
      where: { id },
    });
    return deletedSurvey;
  } catch (e) {
    logger.error(e);
  }
}
