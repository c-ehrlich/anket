import prisma from '../utils/prisma';
import logger from '../utils/logger';

export async function getUserWithSurveys(id: string) {
  try {
    const userWithSurveys = await prisma.user.findUnique({
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
            description: true,
            updatedAt: true,
            isCompleted: true,
            isPublic: true,
          },
        },
      },
    });

    if (!userWithSurveys) throw new Error('Failed to find user');

    return userWithSurveys;
  } catch (e: any) {
    logger.error(e);
  }
}
