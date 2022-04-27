import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyPreviewWithAuthor } from '../api/survey/survey.schema';

export default function useGetAllSurveys() {
  return useQuery<SurveyPreviewWithAuthor[], Error>(['all-surveys'], () =>
    axios.get('/api/survey').then((res) => res.data)
  );
}
