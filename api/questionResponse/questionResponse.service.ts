import logger from '../utils/logger';
import prisma from '../utils/prisma';

export async function upsertTextQuestionResponse({
  questionId,
  surveyParticipationId,
  answerText,
}: {
  questionId: string;
  surveyParticipationId: string;
  answerText: string;
}) {
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
      },
      update: {
        answerText,
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
