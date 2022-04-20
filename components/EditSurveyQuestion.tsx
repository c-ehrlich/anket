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

  const reorderQuestionMutation = useMutation(
    ['survey', survey.data!.id],
    (newOrder: number) => {
      return axios.patch(
        `/api/question/reorder/${survey.data?.questions[props.index].id}`,
        {
          order: newOrder,
        }
      );
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (newOrder) => {
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          const oldOrder = oldSurvey.questions[props.index].order;
          if (newOrder > oldOrder) {
            // -1 to order of items with order: gt oldorder, lte neworder
            const otherMovedItems = oldSurvey.questions
              .filter(
                (question) =>
                  question.order > oldOrder && question.order <= newOrder
              )
              .map((question) => {
                return { ...question, order: question.order - 1 };
              });
            // change order of the item we're actually moving
            const movedQuestion = {
              ...oldSurvey.questions[props.index],
              order: newOrder,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                // the lower stuff
                oldSurvey.questions.slice(0, oldOrder),
                // the stuff we moved
                ...otherMovedItems,
                movedQuestion,
                // everything after the stuff we moved
                oldSurvey.questions.slice(newOrder)
              ),
            });
          }
          if (newOrder < oldOrder) {
            // +1 to order of items with order: lt oldorder, gte newOrder
            const otherMovedItems = oldSurvey.questions
              .filter(
                (question) =>
                  question.order < oldOrder && question.order >= newOrder
              )
              .map((question) => {
                return { ...question, order: question.order + 1 };
              });
            // change order of the item we're actually moving
            const movedQuestion = {
              ...oldSurvey.questions[props.index],
              order: newOrder,
            };
            // rebuild survey object with new questions
            queryClient.setQueryData(['survey', oldSurvey.id], {
              ...oldSurvey,
              questions: ([] as QuestionResponse[]).concat(
                // the lower stuff
                oldSurvey.questions.slice(0, newOrder),
                // the stuff we moved
                movedQuestion,
                ...otherMovedItems,
                // everything after the stuff we moved
                oldSurvey.questions.slice(oldOrder)
              ),
            });
          }
          // if they're the same, we don't need to do anything
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
                  onClick={() => {reorderQuestionMutation.mutate(props.index - 1)}}
                >
                  <CaretUp />
                </ActionIcon>
                <ActionIcon
                  variant='default'
                  disabled={props.index >= survey.data.questions.length - 1}
                  onClick={() => {reorderQuestionMutation.mutate(props.index + 1)}}
                >
                  <CaretDown />
                </ActionIcon>
              </Stack>
              <ActionIcon
                variant='default'
                onClick={() => {
                  // TODO make user confirm in a modal first
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
