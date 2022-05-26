import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UpdateQuestionResponseRequest } from '../../backend/questionResponse/questionResponse.schema';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
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
        queryClient.cancelQueries([QueryKeys.surveyParticipation, surveyId]);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData([QueryKeys.surveyParticipation, surveyId]);

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
          queryClient.setQueryData(
            [QueryKeys.surveyParticipation, surveyId],
            draft
          );
        }
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
