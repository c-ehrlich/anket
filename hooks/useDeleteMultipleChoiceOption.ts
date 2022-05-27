import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { MultipleChoiceOptionFE } from '../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { QuestionFE } from '../backend/question/question.schema';
import { SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

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
  const queryKey = [QueryKeys.survey, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    () => {
      return axios.delete(`/api/multiplechoiceoption/${optionId}`);
    },
    {
      onError: (e) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries(queryKey);
        const oldSurvey: SurveyFE | undefined =
          queryClient.getQueryData(queryKey);
        if (oldSurvey) {
          const optimisticUpdate = {
            ...oldSurvey,
            questions: ([] as QuestionFE[]).concat(
              oldSurvey.questions.slice(0, questionIndex),
              {
                ...oldSurvey.questions[questionIndex],
                multipleChoiceOptions: ([] as MultipleChoiceOptionFE[]).concat(
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
          queryClient.setQueryData(queryKey, optimisticUpdate);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useDeleteMultipleChoiceOption;
