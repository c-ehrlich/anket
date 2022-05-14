import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getQuestionTypeByMultipleChoiceOptionId } from '../multipleChoiceOption/multipleChoiceOption.service';
import { getSurveyIdFromQuestionId } from '../survey/survey.service';
import { ToggleMCMItemRequest } from '../surveyParticipation/surveyParticipation.schema';
import { getSurveyParticipationId } from '../surveyParticipation/surveyParticipation.service';
import getId from '../utils/getId';
import { MultipleChoiceOptionSelectionFE } from './multipleChoiceOptionSelection.schema';
import {
  deleteMCSOptionsForQuestion,
  upsertMultipleChoiceOptionSelection,
} from './multipleChoiceOptionSelection.service';

export async function upsertMultipleChoiceOptionResponseHandler(
  req: NextApiRequest,
  res: NextApiResponse<MultipleChoiceOptionSelectionFE | string>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;
  if (!userId) {
    return res.status(400).send('no session');
  }

  const multipleChoiceOptionId = getId(req);
  if (!multipleChoiceOptionId) {
    return res.status(400).send('no mco id');
  }

  const { selected, surveyId }: ToggleMCMItemRequest = req.body;

  const surveyParticipationId = await getSurveyParticipationId({
    surveyId,
    userId,
  });
  if (!surveyParticipationId) {
    return res.status(400).send('failed to find survey participation');
  }

  const question = await getQuestionTypeByMultipleChoiceOptionId(
    multipleChoiceOptionId
  );
  if (!question) {
    return res.status(400).send('failed to determine question type');
  }

  if (question.questionType === 'multipleChoiceSingle') {
    //delete everything else
    const deletedOptions = await deleteMCSOptionsForQuestion({
      surveyParticipationId,
      questionId: question.id,
    });
  }

  const multipleChoiceOptionSelection:
    | MultipleChoiceOptionSelectionFE
    | undefined = await upsertMultipleChoiceOptionSelection({
    selected,
    multipleChoiceOptionId,
    surveyParticipationId: surveyParticipationId,
  });
  if (!multipleChoiceOptionSelection) {
    return res.status(400).send('failed to upsert');
  }

  return res.status(200).json(multipleChoiceOptionSelection);
}

export async function deleteAllSelectionsForQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ count: number} | string>
) {
  const session = await getSession({ req });
  const userId = session!.user!.id;
  if (!userId) {
    return res.status(400).send('no session');
  }

  const questionId = getId(req);

  // surveyId can optionally be on the request - if not, get from db based on questionId
  let { surveyId }: { surveyId: string | undefined } = req.body;
  if (!surveyId) {
    surveyId = await getSurveyIdFromQuestionId(questionId)
    if (!surveyId) {
      return res.status(400).send('failed to find surveyId');
    }
  }

  const surveyParticipationId = await getSurveyParticipationId({
    surveyId,
    userId,
  });
  if (!surveyParticipationId) {
    return res.status(400).send('failed to find survey participation');
  }

  const deletedMultipleChoiceOptionsCount = await deleteMCSOptionsForQuestion({
    questionId,
    surveyParticipationId
  });
  if (!deletedMultipleChoiceOptionsCount && deletedMultipleChoiceOptionsCount !== 0) {
    return res.status(400).send('failed to delete options');
  }
  
  return res.status(200).json(deletedMultipleChoiceOptionsCount);
}
