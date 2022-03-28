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

// can take a position to insert it at, or just inserts it at the end
// use slice
// export async function addQuestionToSurvey(data: CreateQuestionInput)

// export async function moveQuestionToPosition(questionId: string, position: number)

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
