import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../api/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useDeleteMultipleChoiceOptions = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.surveyParticipation, surveyId],
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
        queryClient.cancelQueries([QueryKeys.surveyParticipation, surveyId]);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData([QueryKeys.surveyParticipation, surveyId]);
        if (draft) {
          draft.questions[data.questionIndex].multipleChoiceOptions.forEach(
            (_, index) => {
              draft!.questions[data.questionIndex].multipleChoiceOptions[
                index
              ].multipleChoiceOptionSelections = [];
            }
          );
          queryClient.setQueryData(
            [QueryKeys.surveyParticipation, surveyId],
            draft
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          QueryKeys.surveyParticipation,
          surveyId,
        ]);
      },
    }
  );
};

export default useDeleteMultipleChoiceOptions;
