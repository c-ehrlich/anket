import prisma from '../utils/prisma'
import logger from '../utils/logger';

export async function getSurveyStats(surveyId: string) {
  try {
    return prisma.survey.findUnique({
      where: { id: surveyId },
      select: {
        id: true,
        name: true,
        description: true,
        updatedAt: true,
        picture: true,
        isPublic: true,
        isCompleted: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        participations: {
          where: {
            isComplete: true,
          },
          select: {
            id: true,
          }
        },
        questions: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            question: true,
            details: true,
            isRequired: true,
            order: true,
            questionType: true,
            questionResponses: {
              select: {
                id: true,
                answerBoolean: true,
                answerNumeric: true,
                answerText: true,
              }
            },
            multipleChoiceOptions: {
              select: {
                id: true,
                name: true,
                multipleChoiceOptionSelections: {
                  select: {
                    id: true,
                    selected: true,
                  }
                }
              },
              orderBy: {
                order: 'asc',
              }
            }
          }
        }
      }
    })
  } catch (e) {
    logger.error(e);
  }
}
