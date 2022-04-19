import { useQuery } from 'react-query';
import axios from 'axios';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

const createSurvey = async () => {
  console.log('creating a new survey');
  const survey: CreateDefaultSurveyResponse = await axios
    .post('/api/survey')
    .then((res) => res.data);
  return survey;
};

export default function useCreateSurvey() {
  return useQuery<CreateDefaultSurveyResponse>(
    ['create-survey'],
    createSurvey,
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    }
  );
}
