import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyStatsResponse } from '../backend/surveyStats/surveyStats.schema';

const getSurveyStats = async (surveyId: string) => {
  const surveys: SurveyStatsResponse = await axios
    .get(`/api/surveyStats/${surveyId}`)
    .then((res) => res.data);
  return surveys;
};

export default function useGetSurveyStats(surveyId: string) {
  const queryKey = ['survey-stats', surveyId];

  return useQuery<SurveyStatsResponse, Error>(queryKey, () =>
    getSurveyStats(surveyId)
  );
}
