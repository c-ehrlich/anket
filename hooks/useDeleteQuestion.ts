import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionFE } from '../backend/question/question.schema';
import { SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

const useDeleteQuestion = ({
  surveyId,
  questionId,
  questionIndex,
}: {
  surveyId: string;
  questionId: string;
  questionIndex: number;
}) => {
  const queryKey = [QueryKeys.survey, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    () => {
      return axios.delete(`/api/question/${questionId}`);
    },
    {
      onError: (e) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries(queryKey);
        const oldSurvey: SurveyFE | undefined = queryClient.getQueryData(queryKey);
        if (oldSurvey) {
          queryClient.setQueryData(queryKey, {
            ...oldSurvey,
            questions: ([] as QuestionFE[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              oldSurvey.questions.slice(questionIndex + 1)
            ),
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useDeleteQuestion;
