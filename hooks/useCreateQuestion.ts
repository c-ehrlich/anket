import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

const useCreateQuestion = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', surveyId],
    () => {
      return axios.post('/api/question', { surveyId });
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        // TODO
        // we don't have optimistic updates here because we don't know the ID of the created
        // question, and that's used the ref that framer motion uses
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', surveyId]);
      },
    }
  );
};

export default useCreateQuestion;
