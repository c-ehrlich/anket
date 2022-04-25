import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Group,
  NativeSelect,
  Radio,
  RadioGroup,
  SegmentedControl,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import { QuestionResponse } from '../api/question/question.schema';
import useCreateMultipleChoiceOption from '../hooks/useCreateMultipleChoiceOption';
import useDeleteQuestion from '../hooks/useDeleteQuestion';
import useEditQuestion from '../hooks/useEditQuestion';
import useReorderQuestion from '../hooks/useReorderQuestion';
import { QuestionTypeString } from '../types/questionType';
import EditSurveyMultipleChoiceOption from './EditSurveyMultipleChoiceOption';

type Props = { index: number; surveyId: string; question: QuestionResponse, questionCount: number };

const EditSurveyQuestion = (props: Props) => {
  const theme = useMantineTheme();

  const xs = useMediaQuery('(max-width: 576px)');

  const editQuestion = useEditQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: props.question.id,
  });
  const deleteQuestion = useDeleteQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: props.question.id,
  });
  const reorderQuestion = useReorderQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: props.question.id,
  });
  const createMultipleChoiceOption = useCreateMultipleChoiceOption({
    surveyId: props.surveyId,
    questionId: props.question.id,
  });

  return (
    <Card shadow='lg' radius='md' p='md' withBorder>
      <Card.Section
        style={{
          backgroundColor:
            theme.colorScheme === 'light'
              ? // ? theme.colors.green[0]
                '#f1fff1'
              : '#001b00',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <Group style={{ justifyContent: 'space-between' }}>
          <Title order={3}>Question {props.index + 1}</Title>
          <Group>
            <ActionIcon
              variant='default'
              disabled={props.index === 0}
              onClick={() => {
                reorderQuestion.mutate(props.index - 1);
              }}
            >
              <CaretUp />
            </ActionIcon>
            <ActionIcon
              variant='default'
              disabled={props.index >= props.questionCount - 1}
              onClick={() => {
                reorderQuestion.mutate(props.index + 1);
              }}
            >
              <CaretDown />
            </ActionIcon>
            <ActionIcon
              variant='default'
              onClick={() => {
                // TODO make user confirm in a modal first
                deleteQuestion.mutate();
              }}
            >
              <Trash />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
      <Stack sx={{ flexGrow: 1 }}>
        <Checkbox
          label='Required'
          checked={props.question.isRequired}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            editQuestion.mutate({
              isRequired: e.currentTarget.checked,
            });
          }}
        />
        <TextInput
          label='Question'
          required
          placeholder='Your question text'
          value={props.question.question}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            editQuestion.mutate({
              question: e.currentTarget.value,
            });
          }}
        />
        <TextInput
          label='Details'
          placeholder='(optional)'
          value={props.question.details}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            editQuestion.mutate({
              details: e.currentTarget.value,
            });
          }}
        />

        <NativeSelect
          label='Question Type'
          data={Object.values(QuestionTypeString)}
          // The 'value' and 'onChange' are like this due to limitations in Prisma's enums
          // we're mapping the values to a separate object which contains the 'nice' string names
          value={
            QuestionTypeString[props.question.questionType]
          }
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            editQuestion.mutate({
              questionType: (
                Object.keys(
                  QuestionTypeString
                ) as (keyof typeof QuestionTypeString)[]
              ).find(
                (key) => QuestionTypeString[key] === e.currentTarget.value
              ),
            });
          }}
        />
        {props.question.questionType ===
          'multipleChoiceMultiple' ||
        props.question.questionType ===
          'multipleChoiceSingle' ? (
          <>
            <Title order={4}>Answer Options</Title>
            {props.question.multipleChoiceOptions.map(
              (mcOption, index) => (
                <EditSurveyMultipleChoiceOption
                  key={mcOption.id}
                  index={index}
                  questionIndex={props.index}
                  questionId={props.question.id}
                  questionType={props.question.questionType}
                  surveyId={props.surveyId}
                  option={mcOption}
                  optionCount={props.question.multipleChoiceOptions.length}
                />
              )
            )}
            <Button onClick={() => createMultipleChoiceOption.mutate()}>
              Add Answer Option
            </Button>
          </>
        ) : props.question.questionType === 'textResponse' ? (
          <Textarea
            disabled
            placeholder='Respondents will be able to type whatever they want'
          />
        ) : props.question.questionType === 'zeroToTen' ? (
          <SegmentedControl
            disabled
            fullWidth
            defaultValue='-1'
            orientation={xs ? 'vertical' : 'horizontal'}
            data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          />
        ) : props.question.questionType === 'yesNoBoolean' ? (
          <RadioGroup orientation='vertical'>
            <Radio value='yes' label='Yes' disabled />
            <Radio value='no' label='No' disabled />
          </RadioGroup>
        ) : null}
      </Stack>
    </Card>
  );
};

export default EditSurveyQuestion;
