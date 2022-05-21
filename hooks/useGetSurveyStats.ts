import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyStatsResponse } from '../api/surveyStats/surveyStats.schema';

const getSurveyStats = async (surveyId: string) => {
  const surveys: SurveyStatsResponse = await axios
    .get(`/api/surveyStats/${surveyId}`)
    .then((res) => res.data);
  return surveys;
};

export default function useGetSurveyStats(surveyId: string) {
  return useQuery<SurveyStatsResponse, Error>(['survey-stats', surveyId], () =>
    getSurveyStats(surveyId)
  );
}
