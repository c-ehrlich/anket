import { useQuery } from 'react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { SurveyPreviewWithAuthorAndInteraction } from '../backend/survey/survey.schema';

const getMySurveys = async (userId: string) => {
  const surveys: SurveyPreviewWithAuthorAndInteraction[] = await axios
    .get(`/api/survey/user?id=${userId}`)
    .then((res) => res.data);
  return surveys;
};

export default function useGetMySurveys() {
  const queryKey = ['my-surveys'];

  const { data: session } = useSession();
  let userId = '';
  if (session?.user?.id) {
    userId = session.user?.id;
  } else {
    console.error('no userId');
  }

  return useQuery<SurveyPreviewWithAuthorAndInteraction[], Error>(
    queryKey,
    () => getMySurveys(userId)
  );
}
