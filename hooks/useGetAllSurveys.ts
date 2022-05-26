import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyPreviewWithAuthorAndInteraction } from '../backend/survey/survey.schema';

export default function useGetAllSurveys() {
  return useQuery<SurveyPreviewWithAuthorAndInteraction[], Error>(['all-surveys'], () =>
    axios.get('/api/survey').then((res) => res.data)
  );
}
