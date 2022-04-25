import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

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
    ['survey', surveyId],
    (
      data: Partial<
        Pick<
          QuestionResponse,
          'question' | 'details' | 'isRequired' | 'questionType'
        >
      >
    ) => {
      return axios.patch(`/api/question/${questionId}`, data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', surveyId]);
        if (oldSurvey) {
          queryClient.setQueryData(['survey', surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionResponse[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              { ...oldSurvey.questions[questionIndex], ...data },
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

export default useEditQuestion;
