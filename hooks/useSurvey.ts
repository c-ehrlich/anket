import { useQuery } from 'react-query';
import axios from 'axios';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

export const getSurvey = async (id: string) => {
  if (id === '') {
    console.log('no id')
    return;
  }
  const survey: CreateDefaultSurveyResponse = await axios
    .get(`/api/survey/${id}`)
  return survey;
}

export default function useSurvey(id: string) {
  return useQuery<CreateDefaultSurveyResponse>(
    ['create-survey', id],
    () => getSurvey(id),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    }
  );
}
