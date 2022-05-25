import prisma from '../utils/prisma';
import logger from '../utils/logger';

export async function getUserWithSurveys(id: string) {
  try {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        surveys: {
          where: {
            isPublic: true,
            isCompleted: true,
          },
          select: {
            id: true,
            name: true,
            picture: true,
            description: true,
            updatedAt: true,
            isCompleted: true,
            isPublic: true,
            participations: {
              where: {
                userId: id,
              },
              select: {
                isComplete: true,
              },
            },
          },
        },
      },
    });
  } catch (e: any) {
    logger.error(e);
  }
}
