import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { QueryKeys } from '../types/queryKeys';

const useDeleteSurvey = ({
  setDeleteModalOpen,
  surveyId,
}: {
  setDeleteModalOpen: (open: boolean) => void;
  surveyId: string;
}) => {
  const queryKey = [QueryKeys.survey, surveyId];
  const router = useRouter();

  return useMutation(
    queryKey,
    () => {
      return axios.delete(`/api/survey/${surveyId}`).then((res) => res.data);
    },
    {
      onError: (e) => window.alert(e),
      onSuccess: () => {
        setDeleteModalOpen(false);
        router.push('/survey/mine');
      },
    }
  );
};

export default useDeleteSurvey;
