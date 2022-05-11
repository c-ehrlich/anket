import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionFE } from '../api/question/question.schema';
import { SurveyFE } from '../api/survey/survey.schema';
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
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.survey, surveyId],
    () => {
      return axios.delete(`/api/question/${questionId}`);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries([QueryKeys.survey, surveyId]);
        const oldSurvey: SurveyFE | undefined = queryClient.getQueryData([
          QueryKeys.survey,
          surveyId,
        ]);
        if (oldSurvey) {
          queryClient.setQueryData([QueryKeys.survey, surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionFE[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              oldSurvey.questions.slice(questionIndex + 1)
            ),
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([QueryKeys.survey, surveyId]);
      },
    }
  );
};

export default useDeleteQuestion;
