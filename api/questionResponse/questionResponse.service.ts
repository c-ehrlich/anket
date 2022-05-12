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
    const questionResponse = prisma.questionResponse.upsert({
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
    return questionResponse;
  } catch (e) {
    logger.error(e);
  }
}

export async function deleteQuestionResponseById(id: string) {
  try {
    const deletedQuestionResponse = prisma.questionResponse.delete({
      where: {
        id,
      },
    });
    return deletedQuestionResponse;
  } catch (e) {
    logger.error(e);
  }
}
