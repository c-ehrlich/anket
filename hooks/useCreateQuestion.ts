import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CreateQuestionData } from '../api/question/question.schema';

const useCreateQuestion = (data: CreateQuestionData) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', data.surveyId],
    () => {
      return axios.post('/api/question', data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        // TODO
        // we don't have optimistic updates here because we don't know the ID of the created
        // question, and that's used the ref that framer motion uses
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', data.surveyId]);
      },
    }
  );
};

export default useCreateQuestion;
