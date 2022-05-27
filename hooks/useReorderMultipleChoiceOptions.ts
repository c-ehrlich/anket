import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { MultipleChoiceOptionFE } from '../backend/multipleChoiceOption/multipleChoiceOption.schema';
import { SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

const useReorderMultipleChoiceOptions = ({
  surveyId,
  questionId,
  questionIndex,
}: {
  surveyId: string;
  questionId: string;
  questionIndex: number;
}) => {
  const queryClient = useQueryClient();
  const queryKey = [QueryKeys.survey, surveyId];

  return useMutation(
    queryKey,
    (data: MultipleChoiceOptionFE[]) => {
      return axios.patch(`/api/multiplechoiceoption/reorder/${questionId}`, data);
    },
    {
      onError: (e) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries(queryKey);
        let optimisticUpdate: SurveyFE | undefined =
          queryClient.getQueryData(queryKey);
        if (optimisticUpdate) {
          optimisticUpdate.questions[questionIndex].multipleChoiceOptions =
            data;
        }
        queryClient.setQueryData(queryKey, optimisticUpdate);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useReorderMultipleChoiceOptions;
