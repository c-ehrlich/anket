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
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', surveyId]);
        if (oldSurvey) {
          const newQuestion: QuestionResponse = {
            id: '0',
            question: '',
            details: '',
            surveyId,
            order: 999999,
            isRequired: true,
            questionType: 'multipleChoiceSingle',
            multipleChoiceOptions: [],
          };
          queryClient.setQueryData(['survey', surveyId], () => {
            return {
              ...oldSurvey,
              questions: [...oldSurvey.questions, newQuestion],
            };
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', surveyId]);
      },
    }
  );
};

export default useCreateQuestion;
