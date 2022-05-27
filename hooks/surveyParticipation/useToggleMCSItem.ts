import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useToggleMCSItem = ({ surveyId }: { surveyId: string }) => {
  const queryKey = [QueryKeys.surveyParticipation, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
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
      onError: (e) => window.alert(e),
      onMutate: (values) => {
        queryClient.cancelQueries(queryKey);
        let draft: SurveyWithParticipationAndUserResponses | undefined =
          queryClient.getQueryData(queryKey);
        if (
          draft?.questions[values.questionIndex].multipleChoiceOptions[
            values.optionIndex
          ]
        ) {
          draft.questions[values.questionIndex].multipleChoiceOptions.forEach(
            (option) => {
              option.multipleChoiceOptionSelections = [];
            }
          );
          draft.questions[values.questionIndex].multipleChoiceOptions[
            values.optionIndex
          ].multipleChoiceOptionSelections[0] = { id: 'temp', selected: true };
          console.log(draft);
          queryClient.setQueryData(queryKey, draft);
        }
      },
      onSettled: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

export default useToggleMCSItem;
