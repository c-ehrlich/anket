import { useQuery } from 'react-query';
import axios from 'axios';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

export const getSingleSurvey = async (id: string) => {
  const survey: CreateDefaultSurveyResponse = await axios
    .get(`/api/survey/${id}`)
    .then(res => res.data);
  return survey;
}

export default function useGetSingleSurvey(id: string) {
  return useQuery<CreateDefaultSurveyResponse>(
    ['survey', id],
    () => getSingleSurvey(id),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
}
