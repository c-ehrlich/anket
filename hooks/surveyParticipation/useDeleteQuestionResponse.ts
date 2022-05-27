import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useDeleteQuestionResponse = ({ surveyId }: { surveyId: string }) => {
  const queryKey = [QueryKeys.surveyParticipation, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    ({
      questionResponseId,
      questionIndex,
    }: {
      questionResponseId: string;
      questionIndex: number;
    }) => {
      return axios
        .delete(`/api/questionresponse/${questionResponseId}`)
        .then((res) => res.data);
    },
    {
      onError: (e) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries(queryKey);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData(queryKey);
        if (draft) {
          draft.questions[data.questionIndex].questionResponses = [];
          queryClient.setQueryData(queryKey, draft);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useDeleteQuestionResponse;
