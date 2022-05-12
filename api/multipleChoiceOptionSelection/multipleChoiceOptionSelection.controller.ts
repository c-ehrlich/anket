import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ToggleMCMItemRequest } from '../surveyParticipation/surveyParticipation.schema';
import { getOrCreateSurveyParticipation, getSurveyParticipationId } from '../surveyParticipation/surveyParticipation.service';
import getId from '../utils/getId';
import logger from '../utils/logger';
import { MultipleChoiceOptionSelectionFE } from './multipleChoiceOptionSelection.schema';
import { upsertMultipleChoiceOptionSelection } from './multipleChoiceOptionSelection.service';

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
