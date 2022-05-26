import React from 'react';
import {
  SurveyQuestionWithResponses,
  SurveyWithParticipationAndUserResponses,
  UpdateSurveyParticipationResponse,
} from '../backend/surveyParticipation/surveyParticipation.schema';
import {
  Avatar,
  Badge,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import useGetOrCreateSurveyParticipation from '../hooks/surveyParticipation/useGetOrCreateSurveyParticipation';
import TakeSurveyNumericResponse from './takeSurvey/TakeSurveyNumericResponse';
import TakeSurveyBooleanResponse from './takeSurvey/TakeSurveyBooleanResponse';
import TakeSurveyTextResponse from './takeSurvey/TakeSurveyTextResponse';
import TakeSurveyMCMOption from './takeSurvey/TakeSurveyMCMOption';
import TakeSurveyMCSResponse from './takeSurvey/TakeSurveyMCSResponse';
import axios from 'axios';
import { useRouter } from 'next/router';

/**
 * TODO: error checking (eg what happens if we navigate here while not being logged in?
 */

interface Props {
  surveyId: string;
}

const TakeSurvey = (props: Props) => {
  const surveyWithInteraction = useGetOrCreateSurveyParticipation({
    surveyId: props.surveyId,
  });

  if (!surveyWithInteraction.data) return <div>dont have it</div>;

  return <TakeSurveyInner survey={surveyWithInteraction.data} />;
};

export default TakeSurvey;

const TakeSurveyInner = ({
  survey,
}: {
  survey: SurveyWithParticipationAndUserResponses;
}) => {
  const router = useRouter();

  async function setComplete() {
    const updatedParticipation: UpdateSurveyParticipationResponse = await axios
      .patch(`/api/surveyparticipation/${survey.participations[0].id}`, {
        isComplete: true,
      })
      .then((res) => res.data);
    if (updatedParticipation.isComplete) {
      router.push(`/survey/submitted/${survey.id}`);
    } else {
      window.alert(JSON.stringify(updatedParticipation));
    }
  }

  return (
    <>
      <Stack style={{ marginBottom: '64px' }}>
        <div style={{ maxHeight: '300px' }}>
          {/* TODO: in production, use Next Image and fix the hosts issue by using something
           * like Cloudinary fetch: https://cloudinary.com/documentation/fetch_remote_images
           */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={survey.picture}
            alt={`Survey Header Image: ${survey.name}`}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>
        <Title order={2}>{survey.name}</Title>
        <div>
          <Badge
            color='gray'
            size='lg'
            variant='outline'
            leftSection={
              <Avatar src={survey.author.image} radius='xl' size={25} mr={5} />
            }
            sx={{ paddingLeft: 0 }}
            styles={{ inner: { textTransform: 'none' } }}
          >
            {survey.author.name}
          </Badge>
        </div>
        {survey.description !== '' && <Text>{survey.description}</Text>}
        {survey.questions.map((question, index) => (
          <TakeSurveyQuestion
            key={question.id}
            question={question}
            index={index}
            surveyId={survey.id}
            surveyParticipationId={survey.participations[0].id}
          />
        ))}

        <Group grow={true}>
          <Button style={{ width: '100%' }} variant='outline' color='red'>
            Cancel
          </Button>
          <Button onClick={setComplete}>Submit</Button>
        </Group>
      </Stack>
    </>
  );
};

const TakeSurveyQuestion = ({
  question,
  index,
  surveyId,
  surveyParticipationId,
}: {
  question: SurveyQuestionWithResponses;
  index: number;
  surveyId: string;
  surveyParticipationId: string;
}) => {
  return (
    <Paper key={question.id} shadow='lg' radius='md' p='md' withBorder>
      <Stack>
        <Group
          align='center'
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <div>
            {question.isRequired ? (
              <Badge variant='filled'>Required</Badge>
            ) : (
              <Badge variant='outline'>Optional</Badge>
            )}
          </div>
          <Text size='xs'>Question {index + 1}</Text>
        </Group>
        <Title order={3}>{question.question}</Title>
        {question.details !== '' && <Text>{question.details}</Text>}
        {question.questionType === 'multipleChoiceMultiple' ? (
          <Stack>
            {question.multipleChoiceOptions.map((option, mcoIndex) => (
              <TakeSurveyMCMOption
                option={option}
                surveyId={surveyId}
                index={index}
                mcoIndex={mcoIndex}
                key={option.id}
              />
            ))}
          </Stack>
        ) : question.questionType === 'multipleChoiceSingle' ? (
          <TakeSurveyMCSResponse
            question={question}
            surveyId={surveyId}
            questionIndex={index}
          />
        ) : question.questionType === 'textResponse' ? (
          <TakeSurveyTextResponse
            answerText={question.questionResponses[0]?.answerText || ''}
            questionId={question.id}
            surveyId={surveyId}
            surveyParticipationId={surveyParticipationId}
          />
        ) : question.questionType === 'yesNoBoolean' ? (
          <TakeSurveyBooleanResponse
            answerBoolean={question.questionResponses[0]?.answerBoolean}
            question={question}
            questionIndex={index}
            surveyId={surveyId}
            surveyParticipationId={surveyParticipationId}
          />
        ) : question.questionType === 'zeroToTen' ? (
          <TakeSurveyNumericResponse
            questionIndex={index}
            surveyId={surveyId}
            surveyParticipationId={surveyParticipationId}
            question={question}
            answerNumeric={question.questionResponses[0]?.answerNumeric || -1}
          />
        ) : (
          <Text>Invalid question type</Text>
        )}
      </Stack>
    </Paper>
  );
};
