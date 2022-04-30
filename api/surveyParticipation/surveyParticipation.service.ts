import prisma from '../utils/prisma';
import logger from '../utils/logger';
import {
  GetSurveyParticipationData,
  SurveyParticipationFE,
} from './surveyParticipation.schema';

export async function getOrCreateSurveyParticipation(
  data: GetSurveyParticipationData
) {
  try {
    let surveyParticipation: SurveyParticipationFE | undefined | null =
      await prisma.surveyParticipation.findFirst({
        where: {
          userId: data.userId,
          surveyId: data.surveyId,
        },
        include: {
          questionResponses: true,
        },
      });

    if (surveyParticipation) return surveyParticipation;

    surveyParticipation = await prisma.surveyParticipation.create({
      data: {
        ...data,
      },
      include: {
        questionResponses: true,
      },
    });

    return surveyParticipation;
  } catch (e: any) {
    logger.error(e);
  }
}
