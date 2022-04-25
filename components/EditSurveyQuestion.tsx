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
import useCreateMultipleChoiceOption from '../hooks/useCreateMultipleChoiceOption';
import useDeleteQuestion from '../hooks/useDeleteQuestion';
import useEditQuestion from '../hooks/useEditQuestion';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';
import useReorderQuestion from '../hooks/useReorderQuestion';
import { QuestionTypeString } from '../types/questionType';
import EditSurveyAnswerOption from './EditSurveyAnswerOption';

type Props = { index: number; surveyId: string };

const EditSurveyQuestion = (props: Props) => {
  const survey = useGetSingleSurvey(props.surveyId);
  const theme = useMantineTheme();

  const xs = useMediaQuery('(max-width: 576px)');

  const editQuestion = useEditQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: survey.data!.questions[props.index].id,
  });
  const deleteQuestion = useDeleteQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: survey.data!.questions[props.index].id,
  });
  const reorderQuestion = useReorderQuestion({
    surveyId: props.surveyId,
    questionIndex: props.index,
    questionId: survey.data!.questions[props.index].id,
  });
  const createMultipleChoiceOption = useCreateMultipleChoiceOption({
    surveyId: props.surveyId,
    questionId: survey.data!.questions[props.index].id,
  });

  return (
    <>
      {survey.isLoading ? (
        'Loading...'
      ) : survey.isError ? (
        'Error...'
      ) : !survey.isFetched ? (
        'Not yet fetched...'
      ) : !survey.data?.questions[props.index] ? (
        'That question does not exist'
      ) : (
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
                  disabled={props.index >= survey.data.questions.length - 1}
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
              checked={survey.data.questions[props.index].isRequired}
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
              value={survey.data.questions[props.index].question}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                editQuestion.mutate({
                  question: e.currentTarget.value,
                });
              }}
            />
            <TextInput
              label='Details'
              placeholder='(optional)'
              value={survey.data.questions[props.index].details}
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
                QuestionTypeString[
                  survey.data.questions[props.index].questionType
                ]
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
            {survey.data.questions[props.index].questionType ===
              'multipleChoiceMultiple' ||
            survey.data.questions[props.index].questionType ===
              'multipleChoiceSingle' ? (
              <>
                <Title order={4}>Answer Options</Title>
                {survey.data.questions[props.index].multipleChoiceOptions.map(
                  (mcOption, index) => (
                    <EditSurveyAnswerOption
                      key={mcOption.id}
                      index={index}
                      questionIndex={props.index}
                      questionId={survey.data.questions[props.index].id}
                      surveyId={props.surveyId}
                    />
                  )
                )}
                <Button onClick={() => createMultipleChoiceOption.mutate()}>
                  Add Answer Option
                </Button>
              </>
            ) : survey.data.questions[props.index].questionType ===
              'textResponse' ? (
              <Textarea
                disabled
                placeholder='Respondents will be able to type whatever they want'
              />
            ) : survey.data.questions[props.index].questionType ===
              'zeroToTen' ? (
              <SegmentedControl
                disabled
                fullWidth
                defaultValue='-1'
                orientation={xs ? 'vertical' : 'horizontal'}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              />
            ) : survey.data.questions[props.index].questionType ===
              'yesNoBoolean' ? (
              <RadioGroup orientation='vertical'>
                <Radio value='yes' label='Yes' disabled />
                <Radio value='no' label='No' disabled />
              </RadioGroup>
            ) : null}
          </Stack>
        </Card>
      )}
    </>
  );
};

export default EditSurveyQuestion;
