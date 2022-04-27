import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionFE } from '../api/question/question.schema';
import { SurveyFE } from '../api/survey/survey.schema';

const useDeleteQuestion = ({
  surveyId,
  questionId,
  questionIndex,
}: {
  surveyId: string;
  questionId: string;
  questionIndex: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', surveyId],
    () => {
      return axios.delete(`/api/question/${questionId}`);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: SurveyFE | undefined =
          queryClient.getQueryData(['survey', surveyId]);
        if (oldSurvey) {
          queryClient.setQueryData(['survey', surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionFE[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              oldSurvey.questions.slice(questionIndex + 1)
            ),
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', surveyId]);
      },
    }
  );
};

export default useDeleteQuestion;
