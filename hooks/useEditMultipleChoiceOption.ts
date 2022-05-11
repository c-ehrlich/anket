import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import {
  EditMultipleChoiceOptionData,
  MultipleChoiceOptionFE,
} from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionFE } from '../api/question/question.schema';
import { SurveyFE } from '../api/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

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
    [QueryKeys.survey, surveyId],
    (data: EditMultipleChoiceOptionData) => {
      return axios.patch(`/api/multiplechoiceoption/${optionId}`, data);
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
              {
                ...oldSurvey.questions[questionIndex],
                multipleChoiceOptions: ([] as MultipleChoiceOptionFE[]).concat(
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
      onSettled: () =>
        queryClient.invalidateQueries([QueryKeys.survey, surveyId]),
    }
  );
};

export default useEditMultipleChoiceOption;
