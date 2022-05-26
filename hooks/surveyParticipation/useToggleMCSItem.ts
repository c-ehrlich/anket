import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useToggleMCSItem = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.surveyParticipation, surveyId],
    ({
      selected,
      questionIndex,
      optionId,
      optionIndex,
    }: {
      selected: boolean;
      questionIndex: number;
      optionId: string;
      optionIndex: number;
    }) => {
      return axios
        .patch(`/api/multiplechoiceoptionselection/${optionId}`, {
          surveyId,
          selected,
        })
        .then((res) => res.data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (values) => {
        queryClient.cancelQueries([QueryKeys.surveyParticipation, surveyId]);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData([QueryKeys.surveyParticipation, surveyId]);
        if (draft?.questions[values.questionIndex].multipleChoiceOptions[values.optionIndex]) {
          draft.questions[values.questionIndex].multipleChoiceOptions.forEach(
            (option) => {
              option.multipleChoiceOptionSelections = [];
            }
          );
          draft.questions[values.questionIndex].multipleChoiceOptions[
            values.optionIndex
          ].multipleChoiceOptionSelections[0] = { id: 'temp', selected: true };
          console.log(draft);
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

export default useToggleMCSItem;
