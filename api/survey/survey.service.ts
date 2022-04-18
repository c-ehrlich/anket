import {
  CreateDefaultSurveyInput,
  CreateDefaultSurveyResponse,
} from './survey.schema';
import prisma from '../utils/prisma';
import log from '../utils/logger';

export async function createDefaultSurvey(data: CreateDefaultSurveyInput) {
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
    console.log(survey);
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

export async function deleteSurvey() {
  return;
}
