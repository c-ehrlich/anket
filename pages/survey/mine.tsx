import { Box, Button, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import Spinner from '../../components/Spinner';
import SurveyHeroList from '../../components/SurveyHeroList';
import useGetMySurveys from '../../hooks/useGetMySurveys';

export default function AllSurveys() {
  return (
    <Stack>
      <Title order={2}>My Surveys</Title>
      <SurveysQuery />
    </Stack>
  );
}

function SurveysQuery() {
  const { data: surveys, isLoading, isError, error } = useGetMySurveys();

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
  const router = useRouter();

  return (
    <>
      <Text>You have not yet created any surveys. Why not create one now?</Text>
      <Box>
        <Button onClick={() => router.push(`/survey/create`)}>
          New Survey
        </Button>
      </Box>
    </>
  );
}
