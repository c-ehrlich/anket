import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { MultipleChoiceOptionFE } from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionFE } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

const useDeleteMultipleChoiceOption = ({
  optionId,
  optionIndex,
  questionIndex,
  surveyId,
}: {
  optionId: string;
  optionIndex: number;
  questionIndex: number;
  surveyId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', surveyId],
    () => {
      return axios.delete(`/api/multiplechoiceoption/${optionId}`);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', surveyId]);
        if (oldSurvey) {
          const optimisticUpdate = {
            ...oldSurvey,
            questions: ([] as QuestionFE[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              {
                ...oldSurvey.questions[questionIndex],
                multipleChoiceOptions: (
                  [] as MultipleChoiceOptionFE[]
                ).concat(
                  oldSurvey.questions[
                    questionIndex
                  ].multipleChoiceOptions.slice(0, optionIndex),
                  oldSurvey.questions[
                    questionIndex
                  ].multipleChoiceOptions.slice(optionIndex + 1)
                ),
              },
              oldSurvey.questions.slice(questionIndex + 1)
            ),
          };
          queryClient.setQueryData(['survey', surveyId], optimisticUpdate);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', surveyId]);
      },
    }
  );
};

export default useDeleteMultipleChoiceOption;
