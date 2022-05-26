import logger from '../utils/logger';
import prisma from '../utils/prisma';
import { UpdateQuestionResponseRequest } from './questionResponse.schema';

export async function upsertQuestionResponse({
  questionId,
  surveyParticipationId,
  answerText,
  answerBoolean,
  answerNumeric,
}: UpdateQuestionResponseRequest) {
  try {
    return prisma.questionResponse.upsert({
      where: {
        surveyParticipationId_questionId: {
          surveyParticipationId,
          questionId,
        },
      },
      create: {
        questionId,
        surveyParticipationId,
        answerText,
        answerBoolean,
        answerNumeric,
      },
      update: {
        answerText,
        answerBoolean,
        answerNumeric,
      },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function deleteQuestionResponseById(id: string) {
  try {
    return prisma.questionResponse.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function getQuestionResponseById(id: string) {
  try {
    return prisma.questionResponse.findUnique({
      where: { id },
      include: {
        surveyParticipation: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  } catch (e) {
    logger.error(e);
  }
}
