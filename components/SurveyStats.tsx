import { Box, Button, Divider, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import {
  SurveyStatsResponse,
  SurveyStatsResponseQuestion,
} from '../backend/surveyStats/surveyStats.schema';
import { useRouter } from 'next/router';
import SurveyStatsYesNo from './surveyStats/SurveyStatsYesNo';
import SurveyStatsMCS from './surveyStats/SurveyStatsMCS';
import SurveyStats0to10 from './surveyStats/SurveyStats0to10';
import SurveyStatsTextResponse from './surveyStats/SurveyStatsTextResponse';
import SurveyStatsMCM from './surveyStats/SurveyStatsMCM';

type PageProps = { survey: SurveyStatsResponse };

export default function SurveyStats(props: PageProps) {
  return (
    <Stack>
      <Title order={1}>Stats</Title>
      <Text>
        {props.survey.participations.length} users have responsed to your
        survey.
      </Text>
      <Divider />
      {props.survey.participations.length !== 0 ? (
        <>
          <div style={{ maxHeight: '300px' }}>
            {/* TODO: in production, use Next Image and fix the hosts issue by using something
             * like Cloudinary fetch: https://cloudinary.com/documentation/fetch_remote_images
             */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.survey.picture}
              alt={`Survey Header Image: ${props.survey.name}`}
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </div>
          <Title order={2}>{props.survey.name}</Title>
          <Text style={{ whiteSpace: 'pre-line' }}>
            {props.survey.description}
          </Text>
          {props.survey.questions.map((q, index) => (
            <Paper withBorder p='md' shadow='md' key={q.id}>
              <Stack>
                <Title order={2}>{q.question}</Title>
                {renderSwitch(q)}
              </Stack>
            </Paper>
          ))}
        </>
      ) : (
        <NoSurveyResponses />
      )}
    </Stack>
  );
}

function renderSwitch(question: SurveyStatsResponseQuestion) {
  switch (question.questionType) {
    case 'multipleChoiceSingle':
      return <SurveyStatsMCS question={question} />;
    case 'multipleChoiceMultiple':
      return <SurveyStatsMCM question={question} />;
    case 'yesNoBoolean':
      return <SurveyStatsYesNo question={question} />;
    case 'zeroToTen':
      return <SurveyStats0to10 question={question} />;
    case 'textResponse':
      return <SurveyStatsTextResponse question={question} />;
    default:
      return (
        <div>
          Unknown questionType:{' '}
          {question.questionType ? question.questionType : 'falsy'}
        </div>
      );
  }
}

function NoSurveyResponses() {
  const router = useRouter();
  return (
    <>
      <Text>It looks like nobody has responded to your survey yet.</Text>
      <Text>
        If you want an example of what this page might look like once people
        respond, we have a response demo page.
      </Text>
      <Box>
        <Button onClick={() => router.push('/survey/stats/demo')}>Demo</Button>
      </Box>
    </>
  );
}
