import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { EditQuestionData, QuestionFE } from '../api/question/question.schema';
import { SurveyFE } from '../api/survey/survey.schema';
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
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.survey, surveyId],
    (data: EditQuestionData) => {
      return axios.patch(`/api/question/${questionId}`, data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
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
              { ...oldSurvey.questions[questionIndex], ...data },
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

export default useEditQuestion;
