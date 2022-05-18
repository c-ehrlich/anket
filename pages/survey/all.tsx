import { Stack, Text, Title } from '@mantine/core';
import React from 'react';
import SurveyHero from '../../components/SurveyHero';
import SurveyHeroList from '../../components/SurveyHeroList';
import useGetAllSurveys from '../../hooks/useGetAllSurveys';

const AllSurveys = () => {
  const { data: surveys, status } = useGetAllSurveys();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>{status}</div>;
  }

  if (!surveys) return <div>No Surveys</div>;

  return (
    <Stack>
      <Title order={2}>All Surveys</Title>
      <SurveyHeroList surveys={surveys} />
    </Stack>
  );
};

export default AllSurveys;
