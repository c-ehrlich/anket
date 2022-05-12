import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getQuestionTypeByMultipleChoiceOptionId } from '../multipleChoiceOption/multipleChoiceOption.service';
import { ToggleMCMItemRequest } from '../surveyParticipation/surveyParticipation.schema';
import {
  getSurveyParticipationId,
} from '../surveyParticipation/surveyParticipation.service';
import getId from '../utils/getId';
import { MultipleChoiceOptionSelectionFE } from './multipleChoiceOptionSelection.schema';
import {
  deleteOtherMCSOptions,
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

  const surveyParticipation = await getSurveyParticipationId({
    surveyId,
    userId,
  });
  if (!surveyParticipation) {
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
    const deletedOptions = await deleteOtherMCSOptions({
      surveyParticipationId: surveyParticipation.id,
      questionId: question.id,
    });
  }

  const multipleChoiceOptionSelection:
    | MultipleChoiceOptionSelectionFE
    | undefined = await upsertMultipleChoiceOptionSelection({
    selected,
    multipleChoiceOptionId,
    surveyParticipationId: surveyParticipation.id,
  });
  if (!multipleChoiceOptionSelection) {
    return res.status(400).send('failed to upsert');
  }

  return res.status(200).json(multipleChoiceOptionSelection);
}
