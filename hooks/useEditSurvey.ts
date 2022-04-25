import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

const useEditSurvey = ({ surveyId }: { surveyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['survey', surveyId],
    (
      data: Partial<
        Pick<CreateDefaultSurveyResponse, 'name' | 'description' | 'isPublic'>
      >
    ) => {
      return axios
        .patch(`/api/survey/${surveyId}`, { ...data })
        .then((res) => res.data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (
        values: Partial<
          Pick<CreateDefaultSurveyResponse, 'name' | 'description' | 'isPublic'>
        >
      ) => {
        queryClient.cancelQueries(['survey', surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
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
