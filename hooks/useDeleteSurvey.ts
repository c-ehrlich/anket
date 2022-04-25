import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const useDeleteSurvey = ({
  setDeleteModalOpen,
  surveyId,
}: {
  setDeleteModalOpen: (open: boolean) => void;
  surveyId: string;
}) => {
  const router = useRouter();

  return useMutation(
    ['survey', surveyId],
    () => {
      return axios.delete(`/api/survey/${surveyId}`).then((res) => res.data);
    },
    {
      onError: (e: any) => window.alert(e),
      onSuccess: () => {
        setDeleteModalOpen(false);
        router.push('/');
      },
    }
  );
};

export default useDeleteSurvey;