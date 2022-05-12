import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { SurveyWithParticipationAndUserResponses } from '../../api/surveyParticipation/surveyParticipation.schema';
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
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.surveyParticipation, surveyId],
    ({ selected, optionId }: { selected: boolean; optionId: string }) => {
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
        if (draft?.questions[questionIndex].multipleChoiceOptions[mcoIndex]) {
          draft.questions[questionIndex].multipleChoiceOptions[
            mcoIndex
          ].multipleChoiceOptionSelections = [
            { id: 'temp', selected: values.selected },
          ];
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

export default useToggleMCMItem;
