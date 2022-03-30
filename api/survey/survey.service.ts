import { CreateSurveyInput } from './survey.schema';
import prisma from '../utils/prisma';
import { Survey } from '@prisma/client';

export async function createNewSurvey(data: CreateSurveyInput) {
  try {
    const survey: Survey = await prisma.survey.create({ data });
    console.log(survey);
    return survey;
  } catch (e) {
    console.error(e);
  }
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
