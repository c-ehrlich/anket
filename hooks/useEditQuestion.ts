import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import {
  EditQuestionData,
  QuestionFE,
} from '../backend/question/question.schema';
import { SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

const useEditQuestion = ({
  questionId,
  questionIndex,
  surveyId,
}: {
  questionId: string;
  questionIndex: number;
  surveyId: string;
}) => {
  const queryKey = [QueryKeys.survey, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    (data: EditQuestionData) => {
      return axios.patch(`/api/question/${questionId}`, data);
    },
    {
      onError: (e) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries(queryKey);
        const oldSurvey: SurveyFE | undefined =
          queryClient.getQueryData(queryKey);
        if (oldSurvey) {
          queryClient.setQueryData(queryKey, {
            ...oldSurvey,
            questions: ([] as QuestionFE[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              { ...oldSurvey.questions[questionIndex], ...data },
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

export default useEditQuestion;
