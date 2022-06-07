import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyFEWithAuthor } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

export const getSingleSurvey = async (id: string) => {
  const survey: SurveyFEWithAuthor = await axios
    .get(`/api/survey/${id}`)
    .then(res => res.data);
  return survey;
}

export default function useGetSingleSurvey(id: string) {
  const queryKey = [QueryKeys.survey, id];

  return useQuery<SurveyFEWithAuthor>(
    queryKey,
    () => getSingleSurvey(id),
  );
}
