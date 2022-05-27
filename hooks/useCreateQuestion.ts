import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CreateQuestionData } from '../backend/question/question.schema';
import { QueryKeys } from '../types/queryKeys';

const useCreateQuestion = (data: CreateQuestionData) => {
  const queryKey = [QueryKeys.survey, data.surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    () => {
      return axios.post('/api/question', data);
    },
    {
      onError: (e) => window.alert(e),
      onMutate: () => {
        // TODO
        // we don't have optimistic updates here because we don't know the ID of the created
        // question, and that's used the ref that framer motion uses
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useCreateQuestion;
