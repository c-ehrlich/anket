import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useDeleteQuestionResponse = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.surveyParticipation, surveyId],
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
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
        queryClient.cancelQueries([QueryKeys.surveyParticipation, surveyId]);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData([QueryKeys.surveyParticipation, surveyId]);
        if (draft) {
          draft.questions[data.questionIndex].questionResponses = [];
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

export default useDeleteQuestionResponse;
