import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyWithAuthor } from '../types/survey';

export default function useGetAllSurveys() {
  return useQuery<SurveyWithAuthor[], Error>(['all-surveys'], () =>
    axios.get('/api/survey').then((res) => res.data)
  );
}
