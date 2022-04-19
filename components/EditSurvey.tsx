import { Button, Group, Input, Stack, Title } from '@mantine/core';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import useSurvey from '../hooks/useSurvey';
import EditSurveyQuestion from './EditSurveyQuestion';
import DeleteSurveyModal from './modals/DeleteSurveyModal';

type Props = {
  surveyId: string;
};

const EditSurvey = (props: Props) => {
  const router = useRouter();
  const survey = useSurvey(props.surveyId);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const deleteSurveyRequest = (id: string) => {
    console.log('in deleteSurveyRequest');
    const deletedSurvey = axios
      .delete(`/api/survey/${id}`)
      .then((res) => res.data);
    console.log(deletedSurvey);
    return deletedSurvey;
  };

  const deleteSurveyMutation = useMutation(
    ['survey', props.surveyId],
    () => deleteSurveyRequest(props.surveyId),
    {
      onError: (e: any) => window.alert(e),
      onSuccess: () => {
        setDeleteModalOpen(false);
        router.push('/');
      },
    }
  );

  const deleteSurvey = () => {
    console.log('in deleteSurvey');
    deleteSurveyMutation.mutate();
  }

  if (!survey.isFetched) return <div>not yet fetched</div>;

  return (
    <>
      <DeleteSurveyModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Survey'
        onClickDelete={deleteSurvey}
      />
      {survey.isLoading ? (
        'Loading...'
      ) : survey.isError ? (
        'Error...'
      ) : (
        <Stack>
          <Title order={2}>Creating survey</Title>
          <Input
            placeholder='Survey name'
            value={survey.data.name}
            onChange={
              (e: React.FormEvent<HTMLInputElement>) => {}
              // handleEditSurveyCoreData({
              //   name: e.currentTarget.value,
              //   description,
              // })
            }
          />

          <Input
            placeholder='Survey description'
            value={survey.data.description}
            onChange={
              (e: React.FormEvent<HTMLInputElement>) => {}
              // handleEditSurveyCoreData({
              //   name,
              //   description: e.currentTarget.value,
              // })
            }
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

          <Button onClick={() => {}}>Add Question</Button>
          <Group grow>
            <Button
              variant='outline'
              color='red'
              onClick={() => setDeleteModalOpen(true)}
            >
              Cancel
            </Button>
            <Button>Complete</Button>
          </Group>

          <div>
            cancel button that deletes the whole survey after a modal
            confirmation, and save button that invalidates the survey so we
            fetch it again, and takes the user (somewhere?)
          </div>
          <div>{JSON.stringify(survey.data)}</div>
        </Stack>
      )}
    </>
  );
};

export default EditSurvey;
