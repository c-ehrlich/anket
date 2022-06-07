import axios from 'axios';
import { useQuery } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

export const getOrCreateSurveyParticipation = async (surveyId: string) => {
  const participation: SurveyWithParticipationAndUserResponses = await axios
    .put(`/api/surveyparticipation/${surveyId}`)
    .then((res) => res.data);
  return participation;
};

export default function useGetOrCreateSurveyParticipation({
  surveyId,
}: {
  surveyId: string;
}) {
  const queryKey = [QueryKeys.surveyParticipation, surveyId];
  return useQuery<SurveyWithParticipationAndUserResponses>(
    queryKey,
    () => getOrCreateSurveyParticipation(surveyId),
  );
}
