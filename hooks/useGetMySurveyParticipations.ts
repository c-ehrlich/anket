import { useQuery } from 'react-query';
import axios from 'axios';
import { DashboardSurveyParticipation } from '../backend/surveyParticipation/surveyParticipation.schema';

const getMySurveyParticipations = async () => {
  const surveys: DashboardSurveyParticipation[] = await axios
    .get(`/api/surveyparticipation`)
    .then((res) => res.data);
  return surveys;
};

export default function useGetMySurveyParticipations() {
  const queryKey = ['dashboard', 'participations'];

  return useQuery<DashboardSurveyParticipation[], Error>(queryKey, () =>
    getMySurveyParticipations()
  );
}
