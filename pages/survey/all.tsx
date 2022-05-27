import { Stack, Text, Title } from '@mantine/core';
import React from 'react';
import Spinner from '../../components/Spinner';
import SurveyHeroList from '../../components/SurveyHeroList';
import useGetAllSurveys from '../../hooks/useGetAllSurveys';

export default function AllSurveys() {
  return (
    <Stack>
      <Title order={2}>All Surveys</Title>
      <SurveysQuery />
    </Stack>
  );
}

function SurveysQuery() {
  const { data: surveys, isLoading, isError, error } = useGetAllSurveys();

  if (isLoading) return <Spinner />;
  if (isError) return <>{JSON.stringify(error)}</>;

  return (
    <>
      {surveys.length === 0 ? (
        <NoSurveys />
      ) : (
        <SurveyHeroList surveys={surveys} />
      )}
    </>
  );
}

function NoSurveys() {
  return <Text>There are no public surveys.</Text>;
}
