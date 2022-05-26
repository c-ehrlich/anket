import {
  CreateDefaultSurveyInput,
  CreateSurvey,
  EditSurveyData,
  SurveyFE,
  SurveyPreviewWithAuthorAndInteraction,
} from './survey.schema';
import prisma from '../utils/prisma';
import logger from '../utils/logger';
import { DEFAULT_SURVEY_PICTURE_URL } from '../../types/defaults';

export async function createSurvey(data: CreateSurvey, authorId: string) {
  try {
    return prisma.survey.create({
      data: {
        ...data,
        picture: data.picture === '' ? DEFAULT_SURVEY_PICTURE_URL : data.picture,
        authorId,
        questions: {
          create: {
            question: '',
            details: '',
            order: 0,
            isRequired: true,
            questionType: 'multipleChoiceSingle',
            multipleChoiceOptions: {
              create: {
                name: '',
                order: 0,
              },
            },
          },
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
  } catch (e) {
    logger.error(e);
  }
}

/*
 * This function was for when the create link made a new survey as soon as we clicked it
 * This has mostly been solved by having a small form before
 * Will leave this function here for now
 * TODO delete this function and associated service if we're sure we don't need it anymore
 */
export async function createDefaultSurvey(data: CreateDefaultSurveyInput) {
  /**
   * We don't want to inadventently create a bunch of surveys. So if there is
   * an existing survey that has not been edited at all from the default, return
   * that instead of creating a new one...
   */
  try {
    const existingSurvey: SurveyFE | null = await prisma.survey.findFirst({
      where: {
        name: '',
        description: '',
        authorId: data.authorId,
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

    if (existingSurvey) {
      return existingSurvey;
    }
  } catch (e: any) {
    logger.error(e);
  }

  // ...If not, create one
  try {
    return prisma.survey.create({
      data: {
        ...data,
        name: '',
        description: '',
        questions: {
          create: {
            question: '',
            details: '',
            order: 0,
            isRequired: true,
            questionType: 'multipleChoiceSingle',
            multipleChoiceOptions: {
              create: {
                name: '',
                order: 0,
              },
            },
          },
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
  } catch (e) {
    logger.error(e);
  }
}

export async function getAllPublicSurveyPreviews(
  userId: string | undefined = undefined
): Promise<SurveyPreviewWithAuthorAndInteraction[] | undefined> {
  try {
    return prisma.survey.findMany({
      where: {
        isCompleted: true,
        isPublic: true,
        authorId: {
          not: userId,
        },
      },
      select: {
        author: { select: { id: true, name: true, image: true, email: true } },
        id: true,
        name: true,
        description: true,
        isCompleted: true,
        isPublic: true,
        picture: true,
        participations: {
          where: {
            userId: userId,
          },
          select: {
            userId: true,
            isComplete: true,
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

export async function getUserSurveyPreviews(authorId: string) {
  return prisma.survey.findMany({
    where: {
      authorId,
    },
    select: {
      author: { select: { id: true, name: true, image: true, email: true } },
      id: true,
      name: true,
      picture: true,
      description: true,
      isCompleted: true,
      isPublic: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getSingleSurvey(id: string) {
  try {
    return prisma.survey.findUnique({
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
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });
  } catch (e: any) {
    logger.error(e);
  }
}

export async function updateSurvey({
  id,
  data,
}: {
  id: string;
  data: EditSurveyData;
}) {
  try {
    return prisma.survey.update({
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
  } catch (e: any) {
    logger.error(e);
  }
}

export async function deleteSurvey({ id }: { id: string }) {
  try {
    return prisma.survey.delete({
      where: { id },
      // TODO do we really need this whole object? Maybe only send the basic data
      include: {
        questions: {
          include: {
            multipleChoiceOptions: true,
          },
        },
      },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function getSurveyOwner(id: string) {
  try {
    return prisma.survey.findUnique({
      where: { id },
      select: {
        authorId: true,
      },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function getSurveyIdFromQuestionId(questionId: string) {
  try {
    const questionWithSurveyId = await prisma.question.findUnique({
      where: { id: questionId },
      select: {
        surveyId: true,
      },
    });

    return questionWithSurveyId?.surveyId;
  } catch (e) {
    logger.error(e);
  }
}
