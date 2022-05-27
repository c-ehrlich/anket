import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useDeleteMultipleChoiceOptions = ({ surveyId }: { surveyId: string }) => {
  const queryKey = [QueryKeys.surveyParticipation, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    ({
      questionId,
      questionIndex,
    }: {
      questionId: string;
      questionIndex: number;
    }) => {
      return axios
        .delete(`/api/multiplechoiceoptionselection/all/${questionId}`, {
          // axios delete requests need to send body in this format
          data: { questionId },
        })
        .then((res) => res.data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries(queryKey);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData(queryKey);
        if (draft) {
          draft.questions[data.questionIndex].multipleChoiceOptions.forEach(
            (_, index) => {
              draft!.questions[data.questionIndex].multipleChoiceOptions[
                index
              ].multipleChoiceOptionSelections = [];
            }
          );
          queryClient.setQueryData(queryKey, draft);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useDeleteMultipleChoiceOptions;
