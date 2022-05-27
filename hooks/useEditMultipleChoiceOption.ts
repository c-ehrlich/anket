import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import {
  EditMultipleChoiceOptionData,
  MultipleChoiceOptionFE,
} from '../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionFE } from '../backend/question/question.schema';
import { SurveyFE } from '../backend/survey/survey.schema';
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
  const queryKey = [QueryKeys.survey, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    (data: EditMultipleChoiceOptionData) => {
      return axios.patch(`/api/multiplechoiceoption/${optionId}`, data);
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
      onSettled: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

export default useEditMultipleChoiceOption;
