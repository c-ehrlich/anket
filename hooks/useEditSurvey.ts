import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { EditSurveyData, SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

const useEditSurvey = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.survey, surveyId],
    (
      data: EditSurveyData
    ) => {
      return axios
        .patch(`/api/survey/${surveyId}`, { ...data })
        .then((res) => res.data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (
        values
      ) => {
        queryClient.cancelQueries([QueryKeys.survey, surveyId]);
        const oldSurvey: SurveyFE | undefined =
          queryClient.getQueryData([QueryKeys.survey, surveyId]);
        if (oldSurvey)
          queryClient.setQueryData([QueryKeys.survey, surveyId], () => {
            return {
              ...oldSurvey,
              ...values,
            };
          });
      },
      onSettled: () => queryClient.invalidateQueries([QueryKeys.survey, surveyId]),
    }
  );
};

export default useEditSurvey;
