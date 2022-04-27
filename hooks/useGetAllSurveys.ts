import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyWithAuthor } from '../api/survey/survey.schema';

export default function useGetAllSurveys() {
  return useQuery<SurveyWithAuthor[], Error>(['all-surveys'], () =>
    axios.get('/api/survey').then((res) => res.data)
  );
}
