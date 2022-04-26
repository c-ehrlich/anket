import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { MultipleChoiceOptionFE } from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

const useEditMultipleChoiceOption = ({
  optionIndex,
  optionId,
  questionIndex,
  surveyId,
}: {
  optionIndex: number;
  optionId: string;
  questionIndex: number;
  surveyId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', surveyId],
    (data: Partial<Pick<MultipleChoiceOptionFE, 'name'>>) => {
      return axios.patch(`/api/multiplechoiceoption/${optionId}`, data);
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
              {
                ...oldSurvey.questions[questionIndex],
                multipleChoiceOptions: (
                  [] as MultipleChoiceOptionFE[]
                ).concat(
                  oldSurvey.questions[
                    questionIndex
                  ].multipleChoiceOptions.slice(0, optionIndex),
                  {
                    ...oldSurvey.questions[questionIndex].multipleChoiceOptions[
                      optionIndex
                    ],
                    ...data,
                  },
                  oldSurvey.questions[
                    questionIndex
                  ].multipleChoiceOptions.slice(optionIndex + 1)
                ),
              },
              oldSurvey.questions.slice(questionIndex + 1)
            ),
          });
        }
      },
      onSettled: () => queryClient.invalidateQueries(['survey', surveyId]),
    }
  );
};

export default useEditMultipleChoiceOption;
