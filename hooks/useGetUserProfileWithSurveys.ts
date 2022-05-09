import { useQuery } from 'react-query';
import axios from 'axios';
import { SurveyFE } from '../api/survey/survey.schema';
import { UserWithSurveysFE } from '../api/user/user.schema';

export const getUserProfileWithSurveys = async (id: string) => {
  const user: UserWithSurveysFE = await axios
    .get(`/api/user/${id}`)
    .then((res) => res.data);
  return user;
};

export default function useGetUserProfileWithSurveys(id: string) {
  return useQuery<UserWithSurveysFE>(
    ['user', id],
    () => getUserProfileWithSurveys(id),
    {
      staleTime: 1000 * 60 * 1, // 1 minute
    }
  );
}
