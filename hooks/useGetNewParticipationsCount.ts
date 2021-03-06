import { useQuery } from 'react-query';
import axios from 'axios';

const getNewParticipationsCount = async () => {
  const surveys: number = await axios
    .get(`/api/surveyparticipation/new?since=${24 * 60 * 60 * 1000}`)
    .then((res) => res.data);
  return surveys;
};

export default function useGetNewParticipationsCount() {
  const queryKey = ['dashboard', 'interactions'];
  return useQuery<number, Error>(queryKey, () => getNewParticipationsCount());
}
