import { Stack, Title } from '@mantine/core';
import React from 'react';
import SurveyHeroList from '../../components/SurveyHeroList';
import useGetMySurveys from '../../hooks/useGetMySurveys';

const AllSurveys = () => {
  const { data: surveys, status } = useGetMySurveys();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>{status}</div>;
  }

  if (!surveys) return <div>No Surveys</div>;

  return (
    <Stack>
      <Title order={2}>My Surveys</Title>
      <SurveyHeroList surveys={surveys} />
    </Stack>
  );
};

export default AllSurveys;
