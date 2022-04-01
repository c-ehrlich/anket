import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyWithAuthor } from '../types/survey';

export default function useSurveys() {
  return useQuery<SurveyWithAuthor[], Error>('surveys', () => axios.get('/api/survey').then((res) => res.data))
}