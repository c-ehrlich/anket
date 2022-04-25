import { Stack, Text, Title } from '@mantine/core';
import React from 'react'
import SurveyHero from '../../components/SurveyHero';
import useGetMySurveys from '../../hooks/useGetMySurveys';

const AllSurveys = () => {
  const {data: surveys, status} = useGetMySurveys();

  if (status === 'loading') {
    return (<div>Loading...</div>)
  }

  if (status === 'error') {
    return (<div>{status}</div>)
  }

  return (
    <Stack>
      <Title order={2}>My Surveys</Title>
      <Text>tktk add sorting/filtering here?</Text>
      {surveys && surveys.map(survey => <SurveyHero survey={survey} key={survey.id} />)}
    </Stack>
  )
}

export default AllSurveys;