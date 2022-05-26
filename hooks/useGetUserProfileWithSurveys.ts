import { useQuery } from 'react-query';
import axios from 'axios';
import { UserWithSurveysFE } from '../backend/user/user.schema';
import { QueryKeys } from '../types/queryKeys';

export const getUserProfileWithSurveys = async (id: string) => {
  const user: UserWithSurveysFE = await axios
    .get(`/api/user/${id}`)
    .then((res) => res.data);
  return user;
};

export default function useGetUserProfileWithSurveys(id: string) {
  return useQuery<UserWithSurveysFE>(
    [QueryKeys.user, id],
    () => getUserProfileWithSurveys(id),
    {
      staleTime: 1000 * 60 * 1, // 1 minute
    }
  );
}
