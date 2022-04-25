import {
  Button,
  Checkbox,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';
import useCreateQuestion from '../hooks/useCreateQuestion';
import useDeleteSurvey from '../hooks/useDeleteSurvey';
import useEditSurvey from '../hooks/useEditSurvey';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';
import animations from '../utils/framer-animations';
import EditSurveyQuestion from './EditSurveyQuestion';
import DeleteSurveyModal from './modals/DeleteSurveyModal';

const EditSurvey = ({ surveyId }: { surveyId: string }) => {
  const survey = useGetSingleSurvey(surveyId);

  return (
    <>
      {survey.isLoading ? (
        'Loading...'
      ) : survey.isError ? (
        'Error...'
      ) : !survey.isFetched ? (
        'Not yet fetched...'
      ) : !survey.data ? (
        'Dont have the data yet for some other reason'
      ) : (
        <EditSurveyHaveData survey={survey.data} />
      )}
    </>
  );
};

const EditSurveyHaveData = ({
  survey,
}: {
  survey: CreateDefaultSurveyResponse;
}) => {
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [surveyName, setSurveyName] = useState<string>(survey.name);
  const [surveyDescription, setSurveyDescription] = useState<string>(
    survey.description
  );

  const debouncedEditSurvey = useDebouncedCallback(
    (
      data: Partial<
        Pick<CreateDefaultSurveyResponse, 'name' | 'description' | 'isPublic'>
      >
    ) => editSurvey.mutate(data),
    1000
  );

  const handleEditSurveyName = (e: React.FormEvent<HTMLInputElement>) => {
    setSurveyName(e.currentTarget.value);
    debouncedEditSurvey({ name: e.currentTarget.value });
  };
  const handleEditSurveyDesc = (e: React.FormEvent<HTMLInputElement>) => {
    setSurveyDescription(e.currentTarget.value);
    debouncedEditSurvey({ description: e.currentTarget.value });
  };

  const editSurvey = useEditSurvey({ surveyId: survey.id });
  const deleteSurvey = useDeleteSurvey({
    surveyId: survey.id,
    setDeleteModalOpen,
  });
  const createQuestion = useCreateQuestion({ surveyId: survey.id });

  return (
    <>
      <DeleteSurveyModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Survey'
        onClickDelete={() => deleteSurvey.mutate()}
      />
      <Stack style={{ marginBottom: '64px' }}>
        {/* <Title order={2}>Creating survey</Title> */}
        <TextInput
          label='Survey Name'
          placeholder='The name for your survey'
          required
          value={surveyName}
          onChange={handleEditSurveyName}
        />

        <TextInput
          label='Survey Description'
          placeholder='(optional)'
          value={surveyDescription}
          onChange={handleEditSurveyDesc}
        />

        <Checkbox
          checked={survey.isPublic}
          label='Public (public surveys show up on the front page, private surveys are only accessible by url)'
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            editSurvey.mutate({ isPublic: e.currentTarget.checked });
          }}
        />

        <Stack>
          <Title order={3}>Questions</Title>
          <AnimatePresence>
            {survey.questions.map((question, index) => (
              <motion.div key={question.id} layout {...animations}>
                <EditSurveyQuestion
                  question={question}
                  index={index}
                  surveyId={survey.id}
                  questionCount={survey.questions.length}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>

        <Button
          onClick={() => {
            createQuestion.mutate();
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
          <Button onClick={() => router.push(`/survey/preview/${survey.id}`)}>
            Preview
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default EditSurvey;
