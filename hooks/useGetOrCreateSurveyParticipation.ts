import axios from 'axios';
import { useQuery } from 'react-query';
import { SurveyParticipationFE } from '../api/surveyParticipation/surveyParticipation.schema';

export const getOrCreateSurveyParticipation = async (surveyId: string) => {
  const participation: SurveyParticipationFE = await axios
    .get(`/api/surveyparticipation/${surveyId}`)
    .then((res) => res.data);
  return participation;
};

export default function useGetOrCreateSurveyParticipation({
  surveyId,
}: {
  surveyId: string;
}) {
  return useQuery<SurveyParticipationFE>(
    ['interaction', surveyId],
    () => getOrCreateSurveyParticipation(surveyId),
    {
      staleTime: 100 * 60 * 5,
    }
  );
}
