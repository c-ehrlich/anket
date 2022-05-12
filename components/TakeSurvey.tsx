import React from 'react';
import {
  SurveyQuestionWithResponses,
  SurveyWithParticipationAndUserResponses,
} from '../api/surveyParticipation/surveyParticipation.schema';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Group,
  Paper,
  Radio,
  RadioGroup,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Eye, EyeOff } from 'tabler-icons-react';
import useGetOrCreateSurveyParticipation from '../hooks/surveyParticipation/useGetOrCreateSurveyParticipation';

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
  return (
    <>
      <Stack style={{ marginBottom: '64px' }}>
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
        <div>
          {survey.isPublic ? (
            <Badge
              size='lg'
              variant='filled'
              sx={{ paddingLeft: 8 }}
              leftSection={
                <Eye size={20} style={{ position: 'relative', top: '4px' }} />
              }
            >
              Public
            </Badge>
          ) : (
            <Badge
              size='lg'
              variant='outline'
              leftSection={
                <EyeOff
                  size={22}
                  style={{ position: 'relative', top: '4px' }}
                />
              }
            >
              Private
            </Badge>
          )}
        </div>
        {survey.questions.map((question, index) => (
          <TakeSurveyQuestion
            key={question.id}
            question={question}
            index={index}
          />
        ))}

        <Group grow={true}>
          <Button style={{ width: '100%' }} variant='outline' color='red'>
            Cancel
          </Button>
          <Button onClick={() => window.alert('todo')}>Submit</Button>
        </Group>
      </Stack>
    </>
  );
};

const TakeSurveyQuestion = ({
  question,
  index,
}: {
  question: SurveyQuestionWithResponses;
  index: number;
}) => {
  const xs = useMediaQuery('(max-width: 576px)');

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
            {question.multipleChoiceOptions.map((option) => (
              <Checkbox
                key={option.id}
                label={option.name}
                onClick={() => console.log(option.id)}
              />
            ))}
          </Stack>
        ) : question.questionType === 'multipleChoiceSingle' ? (
          <RadioGroup orientation='vertical'>
            {question.multipleChoiceOptions.map((option) => (
              <Radio key={option.id} value={option.name} label={option.name} />
            ))}
          </RadioGroup>
        ) : question.questionType === 'textResponse' ? (
          <Textarea placeholder='Type your response here' />
        ) : question.questionType === 'yesNoBoolean' ? (
          <RadioGroup orientation='vertical'>
            <Radio value='yes' label='Yes' />
            <Radio value='no' label='No' />
          </RadioGroup>
        ) : question.questionType === 'zeroToTen' ? (
          <SegmentedControl
            fullWidth
            defaultValue='-1'
            orientation={xs ? 'vertical' : 'horizontal'}
            data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          />
        ) : (
          <Text>Invalid question type</Text>
        )}
        {!question.isRequired && (
          <div>
            <Button size='xs' variant='outline'>
              Remove answer
            </Button>
          </div>
        )}
      </Stack>
    </Paper>
  );
};
