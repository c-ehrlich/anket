import {
  ActionIcon,
  Checkbox,
  Group,
  Input,
  NativeSelect,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { QuestionType } from '@prisma/client';
import React from 'react';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import { QuestionResponse } from '../api/question/question.schema';
import useSurvey from '../hooks/useSurvey';

type Props = { index: number; surveyId: string };

const EditSurveyQuestion = (props: Props) => {
  const survey = useSurvey(props.surveyId);
  return (
    <>
      {survey.isLoading ? (
        'Loading...'
      ) : survey.isError ? (
        'Error...'
      ) : (
        <Paper shadow='lg' radius='md' p='md'>
          <Group align='flex-start'>
            <Stack sx={{ flexGrow: 1 }}>
              <Group style={{ justifyContent: 'space-between' }}>
                <Title order={3}>Question {props.index + 1}</Title>
                <Checkbox
                  label='Required'
                  checked={survey.data.questions[props.index].isRequired}
                  onChange={() => {}}
                />
              </Group>
              <Input
                value={survey.data.questions[props.index].question}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {}}
              />
              <Input
                value={survey.data.questions[props.index].details}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {}}
              />

              <NativeSelect
                label='Question Type'
                data={Object.values(QuestionType)}
                onChange={() => {}}
              />
            </Stack>
            <Stack justify='space-between'>
              <Stack>
                <ActionIcon
                  variant='default'
                  disabled={props.index === 0}
                  onClick={() => {}}
                >
                  <CaretUp />
                </ActionIcon>
                <ActionIcon
                  variant='default'
                  disabled={props.index >= survey.data.questions.length - 1}
                  onClick={() => {}}
                >
                  <CaretDown />
                </ActionIcon>
              </Stack>
              <ActionIcon
                variant='default'
                onClick={() => {}}
              >
                <Trash />
              </ActionIcon>
            </Stack>
          </Group>
        </Paper>
      )}
    </>
  );
};

export default EditSurveyQuestion;
