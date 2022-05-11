import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '../types/queryKeys';

const useCreateMultipleChoiceOption = ({
  surveyId,
  questionId,
  // TODO maybe use the questionIndex to create an optimistic update?
}: {
  surveyId: string;
  questionId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeys.survey, surveyId],
    () => {
      return axios.post('/api/multiplechoiceoption', { questionId });
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        // TODO: for the time being we're not doing optimistic updates here because
        // we're using the id for the element key in the frontend
        // and we don't have the id until we get a response from the server
        // we can't just use a bogus id because it messes with framer-motion
        // (or maybe we can? see if there is a way...)
      },
      onSettled: () => {
        queryClient.invalidateQueries([QueryKeys.survey, surveyId]);
      },
    }
  );
};

export default useCreateMultipleChoiceOption;
