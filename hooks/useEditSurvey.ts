import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { EditSurveyData, SurveyFE } from '../backend/survey/survey.schema';
import { QueryKeys } from '../types/queryKeys';

const useEditSurvey = ({ surveyId }: { surveyId: string }) => {
  const queryKey = [QueryKeys.survey, surveyId];
  const queryClient = useQueryClient();

  return useMutation(
    queryKey,
    (data: EditSurveyData) => {
      return axios
        .patch(`/api/survey/${surveyId}`, { ...data })
        .then((res) => res.data);
    },
    {
      onError: (e) => window.alert(e),
      onMutate: (values) => {
        queryClient.cancelQueries(queryKey);
        const oldSurvey: SurveyFE | undefined =
          queryClient.getQueryData(queryKey);
        if (oldSurvey)
          queryClient.setQueryData(queryKey, () => {
            return {
              ...oldSurvey,
              ...values,
            };
          });
      },
      onSettled: () => queryClient.invalidateQueries(queryKey),
    }
  );
};

export default useEditSurvey;
