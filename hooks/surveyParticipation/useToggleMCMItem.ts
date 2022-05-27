import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../backend/surveyParticipation/surveyParticipation.schema';
import { QueryKeys } from '../../types/queryKeys';

const useToggleMCMItem = ({
  surveyId,
  questionIndex,
  mcoIndex,
}: {
  surveyId: string;
  questionIndex: number;
  mcoIndex: number;
}) => {
  const queryKey = [QueryKeys.surveyParticipation, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    ({ selected, optionId }: { selected: boolean; optionId: string }) => {
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
        if (draft?.questions[questionIndex].multipleChoiceOptions[mcoIndex]) {
          draft.questions[questionIndex].multipleChoiceOptions[
            mcoIndex
          ].multipleChoiceOptionSelections = [
            { id: 'temp', selected: values.selected },
          ];
          queryClient.setQueryData(queryKey, draft);
        }
      },
      onSettled: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

export default useToggleMCMItem;
