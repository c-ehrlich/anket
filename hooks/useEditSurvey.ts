import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { EditSurveyData, SurveyFE } from '../api/survey/survey.schema';

const useEditSurvey = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', surveyId],
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
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: SurveyFE | undefined =
          queryClient.getQueryData(['survey', surveyId]);
        if (oldSurvey)
          queryClient.setQueryData(['survey', surveyId], () => {
            return {
              ...oldSurvey,
              ...values,
            };
          });
      },
      onSettled: () => queryClient.invalidateQueries(['survey', surveyId]),
    }
  );
};

export default useEditSurvey;
