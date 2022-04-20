import { useQuery } from 'react-query';
import axios from 'axios';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

export const getSurvey = async (id: string) => {
  const survey: CreateDefaultSurveyResponse = await axios
    .get(`/api/survey/${id}`)
    .then(res => res.data);
  return survey;
}

export default function useSurvey(id: string) {
  return useQuery<CreateDefaultSurveyResponse>(
    ['survey', id],
    () => getSurvey(id),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
}