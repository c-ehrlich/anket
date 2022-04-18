import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyWithAuthor } from '../types/survey';
import { useSession } from 'next-auth/react';

const fetchMySurveys = async (userId: string) => {
  const surveys: SurveyWithAuthor[] = await axios
    .get(`/api/survey/user?id=${userId}`)
    .then((res) => res.data);
  return surveys;
};

export default function useMySurveys() {
  const { data: session } = useSession();
  let userId = '';
  if (session?.user?.id) {
    userId = session.user?.id;
  } else {
    console.error('no userId');
  }

  return useQuery<SurveyWithAuthor[], Error>(['my-surveys'], () =>
    fetchMySurveys(userId)
  );
}
