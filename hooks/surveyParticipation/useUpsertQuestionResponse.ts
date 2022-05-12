import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UpdateQuestionResponseRequest } from '../../api/questionResponse/questionResponse.schema';
import { QueryKeys } from '../../types/queryKeys';

const useUpsertQuestionResponse = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.surveyParticipation, surveyId],
    ({
      questionId,
      surveyParticipationId,
      answerText,
      answerNumeric,
      answerBoolean,
    }: UpdateQuestionResponseRequest) => {
      return axios
        .patch(`/api/questionresponse`, {
          questionId,
          surveyParticipationId,
          answerText,
          answerNumeric,
          answerBoolean,
        })
        .then((res) => res.data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (values) => {
        // TODO: optimistic update
      },
      onSettled: () =>
        queryClient.invalidateQueries([
          QueryKeys.surveyParticipation,
          surveyId,
        ]),
    }
  );
};

export default useUpsertQuestionResponse;
