import {
  CreateDefaultSurveyInput,
  CreateDefaultSurveyResponse,
} from './survey.schema';
import prisma from '../utils/prisma';
import { Survey } from '@prisma/client';

export async function createDefaultSurvey(data: CreateDefaultSurveyInput) {
  // if there is a survey that has not been changed (createdAt === modifiedAt, no questions) use that
  // const existingSurvey = await prisma.survey.findFirst({
  //   where: {
  //     authorId: data.authorId,
  //     questions: {
  //       none: {}
  //     }
  //   }
  // })

  // if (existingSurvey) return existingSurvey;

  // otherwise, make a new one
  try {
    const survey: CreateDefaultSurveyResponse = await prisma.survey.create({
      data: {
        ...data,
        name: '',
        description: '',
      },
      include: {
        questions: {
          include: {
            multipleChoiceOptions: true,
          },
        },
      },
    });
    return survey;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllSurveyPreviews() {
  const surveys = await prisma.survey.findMany({
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
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return surveys;
}

export async function getAllSurveysWithQuestionsAndMultipleChoiceOptions() {
  const surveys = await prisma.survey.findMany({
    include: { questions: { include: { multipleChoiceOptions: true } } },
  });

  return surveys;
}

export async function getSurveyWithQuestionsAndMultipleChoiceOptions(
  id: string
) {
  const survey = await prisma.survey.findUnique({
    where: { id },
    include: { questions: { include: { multipleChoiceOptions: true } } },
  });

  return survey;
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
    });
    return updatedSurvey;
  } catch (e: any) {
    console.log(e);
  }
}

export async function deleteSurvey() {
  return;
}
