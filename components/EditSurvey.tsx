import {
  Button,
  Checkbox,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';
import useDeleteSurvey from '../hooks/useDeleteSurvey';
import useEditSurvey from '../hooks/useEditSurvey';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';
import EditSurveyQuestion from './EditSurveyQuestion';
import DeleteSurveyModal from './modals/DeleteSurveyModal';

type Props = {
  surveyId: string;
};

const EditSurvey = (props: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const survey = useGetSingleSurvey(props.surveyId);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const editSurvey = useEditSurvey({ surveyId: props.surveyId });
  const deleteSurvey = useDeleteSurvey({
    surveyId: props.surveyId,
    setDeleteModalOpen: setDeleteModalOpen,
  });

  const createQuestionMutation = useMutation(
    ['survey', props.surveyId],
    () => {
      return axios.post('/api/question', {
        surveyId: props.surveyId,
      });
    },
    {
      onError: (e: any) => window.alert(e),
      onMutate: () => {
        queryClient.cancelQueries(['survey', props.surveyId]);
        const oldSurvey: CreateDefaultSurveyResponse | undefined =
          queryClient.getQueryData(['survey', props.surveyId]);
        if (oldSurvey) {
          const newQuestion: QuestionResponse = {
            id: '0',
            question: '',
            details: '',
            surveyId: survey.data!.id,
            order: 999999,
            isRequired: true,
            questionType: 'multipleChoiceSingle',
            multipleChoiceOptions: [],
          };
          queryClient.setQueryData(['survey', props.surveyId], () => {
            return {
              ...oldSurvey,
              questions: [...oldSurvey.questions, newQuestion],
            };
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
      <DeleteSurveyModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Survey'
        onClickDelete={() => deleteSurvey.mutate()}
      />
      {survey.isLoading ? (
        'Loading...'
      ) : survey.isError ? (
        'Error...'
      ) : !survey.isFetched ? (
        'Not yet fetched...'
      ) : (
        <Stack style={{ marginBottom: '64px' }}>
          {/* <Title order={2}>Creating survey</Title> */}
          <TextInput
            label='Survey Name'
            placeholder='The name for your survey'
            required
            value={survey.data.name}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              editSurvey.mutate({ name: e.currentTarget.value });
            }}
          />

          <TextInput
            label='Survey Description'
            placeholder='(optional)'
            value={survey.data.description}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              editSurvey.mutate({ description: e.currentTarget.value });
            }}
          />

          <Checkbox
            checked={survey.data.isPublic}
            label='Public (public surveys show up on the front page, private surveys are only accessible by url)'
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              editSurvey.mutate({ isPublic: e.currentTarget.checked });
            }}
          />

          <Stack>
            <Title order={3}>Questions</Title>
            <AnimatePresence>
              {survey.data.questions.map((question, index) => (
                <motion.div key={question.id}>
                  <EditSurveyQuestion surveyId={survey.data.id} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>

          <Button
            onClick={() => {
              createQuestionMutation.mutate();
            }}
          >
            Add Question
          </Button>
          <Group grow>
            <Button
              variant='outline'
              color='red'
              onClick={() => setDeleteModalOpen(true)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => router.push(`/survey/preview/${survey.data.id}`)}
            >
              Preview
            </Button>
          </Group>
        </Stack>
      )}
    </>
  );
};

export default EditSurvey;
