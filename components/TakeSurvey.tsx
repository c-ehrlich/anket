import React, { useState } from 'react';
import {
  MultipleChoiceOptionFE,
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
import useToggleMCMItem from '../hooks/surveyParticipation/useToggleMCMItem';
import useToggleMCSItem from '../hooks/surveyParticipation/useToggleMCSItem';
import useUpsertQuestionResponse from '../hooks/surveyParticipation/useUpsertQuestionResponse';
import { useDebouncedCallback } from 'use-debounce';
import { UpdateQuestionResponseRequest } from '../api/questionResponse/questionResponse.schema';

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
            surveyId={survey.id}
            surveyParticipationId={survey.participations[0].id}
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
  surveyId,
  surveyParticipationId,
}: {
  question: SurveyQuestionWithResponses;
  index: number;
  surveyId: string;
  surveyParticipationId: string;
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
            {question.multipleChoiceOptions.map((option, mcoIndex) => (
              <MCOOption
                option={option}
                surveyId={surveyId}
                index={index}
                mcoIndex={mcoIndex}
                key={option.id}
              />
            ))}
          </Stack>
        ) : question.questionType === 'multipleChoiceSingle' ? (
          <>
            {question.multipleChoiceOptions.map((option, mcoIndex) => (
              <MCSOption
                option={option}
                surveyId={surveyId}
                index={index}
                mcoIndex={mcoIndex}
                key={option.id}
              />
            ))}
          </>
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
            questionId={question.id}
            surveyId={surveyId}
            surveyParticipationId={surveyParticipationId}
          />
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

const MCOOption = ({
  surveyId,
  option,
  index,
  mcoIndex,
}: {
  surveyId: string;
  index: number;
  option: MultipleChoiceOptionFE;
  mcoIndex: number;
}) => {
  const toggleMCMItemMutation = useToggleMCMItem({
    surveyId,
    questionIndex: index,
    mcoIndex,
  });

  return (
    <Checkbox
      key={option.id}
      label={option.name}
      onClick={() => {
        toggleMCMItemMutation.mutate({
          selected: !option.multipleChoiceOptionSelections[0]?.selected,
          optionId: option.id,
        });
      }}
      defaultChecked={option.multipleChoiceOptionSelections[0]?.selected}
    />
  );
};

const MCSOption = ({
  surveyId,
  option,
  index,
  mcoIndex,
}: {
  surveyId: string;
  index: number;
  option: MultipleChoiceOptionFE;
  mcoIndex: number;
}) => {
  const toggleMCSItemMutation = useToggleMCSItem({
    surveyId,
    questionIndex: index,
    mcoIndex,
  });

  return (
    <Radio
      key={option.id}
      value={option.name}
      label={option.name}
      onClick={() => {
        toggleMCSItemMutation.mutate({
          selected: true,
          optionId: option.id,
        });
      }}
      checked={option.multipleChoiceOptionSelections[0]?.selected || false}
    />
  );
};

interface TakeSurveyTextResponseProps {
  surveyId: string;
  questionId: string;
  surveyParticipationId: string;
  answerText: string;
}
const TakeSurveyTextResponse = (props: TakeSurveyTextResponseProps) => {
  const [answerText, setAnswerText] = useState<string>(props.answerText);
  const upsertQuestionResponseMutation = useUpsertQuestionResponse({
    surveyId: props.surveyId,
  });

  const debouncedEditResponseText = useDebouncedCallback(
    (data: UpdateQuestionResponseRequest) =>
      upsertQuestionResponseMutation.mutate(data),
    1000
  );

  const handleEditResponseText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setAnswerText(e.currentTarget.value);
    debouncedEditResponseText({
      questionId: props.questionId,
      surveyParticipationId: props.surveyParticipationId,
      answerText: e.currentTarget.value,
    });
  };

  return (
    <Textarea
      placeholder='Type your response here'
      value={answerText}
      onChange={handleEditResponseText}
    />
  );
};

interface TakeSurveyBooleanResponseProps {
  surveyId: string;
  questionId: string;
  surveyParticipationId: string;
  answerBoolean: boolean | null;
}
const TakeSurveyBooleanResponse = (props: TakeSurveyBooleanResponseProps) => {
  const [answerBoolean, setAnswerBoolean] = useState<boolean | null>(
    props.answerBoolean
  );
  const upsertQuestionResponseMutation = useUpsertQuestionResponse({
    surveyId: props.surveyId,
  });

  const debouncedEditResponseBoolean = useDebouncedCallback(
    (data: UpdateQuestionResponseRequest) =>
      upsertQuestionResponseMutation.mutate(data),
    1000
  );

  const handleEditResponseBoolean = (value: string) => {
    const boolValue = value === 'yes' ? true : false;
    setAnswerBoolean(boolValue);
    debouncedEditResponseBoolean({
      questionId: props.questionId,
      surveyParticipationId: props.surveyParticipationId,
      answerBoolean: boolValue,
    });
  };

  return (
    <>
      <RadioGroup
        orientation='vertical'
        onChange={handleEditResponseBoolean}
        value={
          answerBoolean === true ? 'yes' : answerBoolean === false ? 'no' : ''
        }
      >
        <Radio value='yes' label='Yes' />
        <Radio value='no' label='No' />
      </RadioGroup>
    </>
  );
};

interface TakeSurveyNumericResponseProps {
  surveyId: string;
  questionId: string;
  surveyParticipationId: string;
  answerNumeric: number;
}
const TakeSurveyNumericResponse = (props: TakeSurveyNumericResponseProps) => {};
