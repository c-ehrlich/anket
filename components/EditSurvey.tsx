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
import React, { memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EditSurveyData, SurveyFE } from '../api/survey/survey.schema';
import useCreateQuestion from '../hooks/useCreateQuestion';
import useDeleteSurvey from '../hooks/useDeleteSurvey';
import useEditSurvey from '../hooks/useEditSurvey';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';
import animations from '../utils/framer-animations';
import EditSurveyQuestion from './EditSurveyQuestion';
import DeleteModal from './modals/DeleteModal';

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

const EditSurveyHaveData = memo(({ survey }: { survey: SurveyFE }) => {
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [surveyName, setSurveyName] = useState<string>(survey.name);
  const [surveyDescription, setSurveyDescription] = useState<string>(
    survey.description
  );

  // we need a separate debounce for each field, otherwise
  // hitting tab and continuing to type will cancel the requests
  // for the previous field
  const debouncedEditSurveyName = useDebouncedCallback(
    (data: EditSurveyData) => editSurvey.mutate(data),
    1000
  );
  const debouncedEditSurveyDescription = useDebouncedCallback(
    (data: EditSurveyData) => editSurvey.mutate(data),
    1000
  );

  const handleEditSurveyName = (e: React.FormEvent<HTMLInputElement>) => {
    setSurveyName(e.currentTarget.value);
    debouncedEditSurveyName({ name: e.currentTarget.value });
  };
  const handleEditSurveyDesc = (e: React.FormEvent<HTMLInputElement>) => {
    setSurveyDescription(e.currentTarget.value);
    debouncedEditSurveyDescription({ description: e.currentTarget.value });
  };

  const editSurvey = useEditSurvey({ surveyId: survey.id });
  const deleteSurvey = useDeleteSurvey({
    surveyId: survey.id,
    setDeleteModalOpen,
  });
  const createQuestion = useCreateQuestion({ surveyId: survey.id });

  return (
    <>
      <DeleteModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Survey'
        text='Are you sure? The survey will be deleted permanently.'
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
          <AnimatePresence initial={false}>
            {survey.questions.map((question, index) => (
              <motion.div key={question.id} layout {...animations}>
                <EditSurveyQuestion
                  key={question.id}
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
            Delete
          </Button>
          <Button onClick={() => router.push(`/survey/preview/${survey.id}`)}>
            Preview
          </Button>
        </Group>
      </Stack>
    </>
  );
});

EditSurveyHaveData.displayName = 'EditSurveyHaveData';

export default EditSurvey;
