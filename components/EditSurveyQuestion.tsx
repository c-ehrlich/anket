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
import axios from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';
import useSurvey from '../hooks/useSurvey';

type Props = { index: number; surveyId: string };

const EditSurveyQuestion = (props: Props) => {
  const queryClient = useQueryClient();
  const survey = useSurvey(props.surveyId);

  const editQuestionMutation = useMutation(
    ['survey', props.surveyId],
    (data: Partial<QuestionResponse>) => {
      return axios.patch(
        `/api/question/${survey.data?.questions[props.index].id}`,
        data
      );
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(['survey', props.surveyId]);
      },
    }
  );

  const deleteQuestionMutation = useMutation(
    ['survey', props.surveyId],
    () => {
      return axios.delete(
        `/api/question/${survey.data?.questions[props.index].id}`
      );
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          queryClient.setQueryData(['survey', props.surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionResponse[]).concat(
              oldSurvey.questions.slice(0, props.index),
              oldSurvey.questions.slice(3)
            ),
          });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['survey', props.surveyId]);
      },
    }
  );

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
        <Paper shadow='lg' radius='md' p='md'>
          <Group align='flex-start'>
            <Stack sx={{ flexGrow: 1 }}>
              <Group style={{ justifyContent: 'space-between' }}>
                <Title order={3}>Question {props.index + 1}</Title>
                <Checkbox
                  label='Required'
                  checked={survey.data.questions[props.index].isRequired}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    editQuestionMutation.mutate({
                      isRequired: e.currentTarget.checked,
                    });
                  }}
                />
              </Group>
              <Input
                value={survey.data.questions[props.index].question}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  editQuestionMutation.mutate({
                    question: e.currentTarget.value,
                  });
                }}
              />
              <Input
                value={survey.data.questions[props.index].details}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  editQuestionMutation.mutate({
                    details: e.currentTarget.value,
                  });
                }}
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
                onClick={() => {
                  deleteQuestionMutation.mutate();
                }}
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
