import { Box, Stack } from '@mantine/core';
import { Suspense } from 'react';
import useGetMySurveys from '../hooks/useGetMySurveys';
import useGetMyUnfinshedSurveyParticipations from '../hooks/useGetMyUnfinishedSurveyParticipations';
import useGetNewParticipationsCount from '../hooks/useGetNewParticipationsCount';

function Dashboard() {
  const { data: mySurveysData } = useGetMySurveys();
  const { data: myUnfinishedParticipations } =
    useGetMyUnfinshedSurveyParticipations();
  const { data: newParticipationsCount } = useGetNewParticipationsCount();

  return (
    <Stack>
      <Box>
        {mySurveysData !== undefined ? (
          <div>{JSON.stringify(mySurveysData)}</div>
        ) : (
          <div>dont have mySurveysData</div>
        )}
      </Box>
      <Box>
        {myUnfinishedParticipations !== undefined ? (
          <div>{JSON.stringify(myUnfinishedParticipations)}</div>
        ) : (
          <div>dont have myUnfinishedParticipations</div>
        )}
      </Box>
      <Box>
        {newParticipationsCount !== undefined ? (
          <div>{JSON.stringify(newParticipationsCount)}</div>
        ) : (
          <div>dont have newParticipationsCount</div>
        )}
      </Box>
    </Stack>
  );
}

export default Dashboard;
