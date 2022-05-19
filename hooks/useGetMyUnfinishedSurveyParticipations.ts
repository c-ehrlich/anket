import { useQuery } from 'react-query';
import axios from 'axios';
import { DashboardSurveyParticipation } from '../api/surveyParticipation/surveyParticipation.schema';

const getMyUnfinishedSurveyParticipations = async () => {
  const surveys: DashboardSurveyParticipation[] = await axios
    .get(`/api/surveyparticipation?unfinished=true`)
    .then((res) => res.data);
  return surveys;
};

export default function useGetMyUnfinshedSurveyParticipations() {
  return useQuery<DashboardSurveyParticipation[], Error>(
    ['dashboard', 'participations'],
    () => getMyUnfinishedSurveyParticipations()
  );
}
