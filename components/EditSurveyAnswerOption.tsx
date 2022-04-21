import { ActionIcon, Checkbox, Group, Input, Radio } from '@mantine/core';
import React from 'react';
import useSurvey from '../hooks/useSurvey';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { QuestionResponse } from '../api/question/question.schema';
import { MultipleChoiceOptionResponse } from '../api/multipleChoiceOption/multipleChoiceOption.schema';
import { Question } from '@prisma/client';
import { CaretDown, CaretUp, Trash } from 'tabler-icons-react';

type Props = {
  index: number;
  questionIndex: number;
  questionId: string;
  surveyId: string;
};

const EditSurveyAnswerOption = (props: Props) => {
  const survey = useSurvey(props.surveyId);
  const queryClient = useQueryClient();
  const question = survey.data?.questions[props.questionIndex];
  const option = question?.multipleChoiceOptions[props.index];

  const editMultipleChoiceOptionMutation = useMutation(
    ['survey', props.surveyId],
    (data: Partial<Pick<MultipleChoiceOptionResponse, 'name'>>) => {
      console.log('---data---');
      console.log(data);
      return axios.patch(`/api/multiplechoiceoption/${option!.id}`, data);
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: (data) => {
        // TODO write me!!
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          queryClient.setQueryData(['survey', props.surveyId], {
            ...oldSurvey,
            questions: ([] as QuestionResponse[]).concat(
              oldSurvey.questions.slice(0, props.questionIndex),
              {
                ...oldSurvey.questions[props.questionIndex],
                multipleChoiceOptions: (
                  [] as MultipleChoiceOptionResponse[]
                ).concat(
                  oldSurvey.questions[
                    props.questionIndex
                  ].multipleChoiceOptions.slice(0, props.index),
                  {...oldSurvey.questions[props.questionIndex].multipleChoiceOptions[props.index], ...data},
                  oldSurvey.questions[
                    props.questionIndex
                  ].multipleChoiceOptions.slice(props.index + 1)
                ),
              },
              oldSurvey.questions.slice(props.questionIndex + 1)
            ),
          });
        }
      },
      onSettled: () =>
        queryClient.invalidateQueries(['survey', props.surveyId]),
    }
  );

  const deleteMultipleChoiceOptionMutation = useMutation(
    ['survey', props.surveyId],
    () => {
      return axios.delete(`/api/multiplechoiceoption/${option!.id}`);
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
              oldSurvey.questions.slice(0, props.questionIndex),
              {
                ...oldSurvey.questions[props.questionIndex],
                multipleChoiceOptions: (
                  [] as MultipleChoiceOptionResponse[]
                ).concat(
                  oldSurvey.questions[
                    props.questionIndex
                  ].multipleChoiceOptions.slice(0, props.index),
                  oldSurvey.questions[
                    props.questionIndex
                  ].multipleChoiceOptions.slice(props.index + 1)
                ),
              },
              oldSurvey.questions.slice(props.questionIndex + 1)
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
      ) : !survey.data?.questions[props.questionIndex].multipleChoiceOptions[
          props.index
        ] ? (
        'That question does not exist'
      ) : (
        <Group grow={false} style={{ width: '100%' }}>
          {question!.questionType === 'multipleChoiceMultiple' ? (
            <Checkbox disabled />
          ) : question!.questionType === 'multipleChoiceSingle' ? (
            <Radio disabled value='' />
          ) : null}
          <Input
            style={{ flexGrow: 1 }}
            placeholder='Answer Text'
            value={option!.name}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              editMultipleChoiceOptionMutation.mutate({
                name: e.currentTarget.value,
              });
            }}
          />
          <Group>
            <ActionIcon variant='default' onClick={() => {}}>
              <CaretUp />
            </ActionIcon>
            <ActionIcon variant='default' onClick={() => {}}>
              <CaretDown />
            </ActionIcon>
            <ActionIcon
              variant='default'
              onClick={() => deleteMultipleChoiceOptionMutation.mutate()}
            >
              <Trash />
            </ActionIcon>
          </Group>
        </Group>
      )}
    </>
  );
};

export default EditSurveyAnswerOption;
