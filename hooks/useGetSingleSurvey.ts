import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyFE, SurveyFEWithAuthor } from '../api/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

export const getSingleSurvey = async (id: string) => {
  const survey: SurveyFEWithAuthor = await axios
    .get(`/api/survey/${id}`)
    .then(res => res.data);
  return survey;
}

export default function useGetSingleSurvey(id: string) {
  return useQuery<SurveyFEWithAuthor>(
    [QueryKeys.survey, id],
    () => getSingleSurvey(id),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
}
