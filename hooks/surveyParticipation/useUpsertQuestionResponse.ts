import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UpdateQuestionResponseRequest } from '../../backend/questionResponse/questionResponse.schema';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useUpsertQuestionResponse = ({ surveyId }: { surveyId: string }) => {
  const queryKey = [QueryKeys.surveyParticipation, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
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
      onError: (e) => window.alert(e),
      onMutate: (values) => {
        queryClient.cancelQueries(queryKey);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData(queryKey);

        if (draft) {
          const index = draft.questions.findIndex(
            (question) => question.id === values.questionId
          );
          draft.questions[index].questionResponses[0] = {
            ...draft.questions[index].questionResponses[0],
            answerText: values.answerText ? values.answerText : null,
            answerNumeric: values.answerNumeric ? values.answerNumeric : null,
            answerBoolean: values.answerBoolean ? values.answerBoolean : null,
          };
          queryClient.setQueryData(queryKey, draft);
        }
      },
      onSettled: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

export default useUpsertQuestionResponse;
