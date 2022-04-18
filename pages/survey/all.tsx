import { Stack, Text, Title } from '@mantine/core';
import React from 'react'
import SurveyHero from '../../components/SurveyHero';
import useAllSurveys from '../../hooks/useAllSurveys'

const AllSurveys = () => {
  const {data: surveys, status} = useAllSurveys();

  if (status === 'loading') {
    return (<div>Loading...</div>)
  }

  return (
    <Stack>
      <Title order={2}>All Surveys</Title>
      <Text>tktk add sorting/filtering here?</Text>
      {surveys && surveys.map(survey => <SurveyHero survey={survey} key={survey.id} />)}
    </Stack>
  )
}

export default AllSurveys;