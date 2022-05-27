import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyPreviewWithAuthorAndInteraction } from '../backend/survey/survey.schema';

export default function useGetAllSurveys() {
  const queryKey = ['all-surveys'];

  return useQuery<SurveyPreviewWithAuthorAndInteraction[], Error>(
    queryKey,
    () => axios.get('/api/survey').then((res) => res.data)
  );
}
