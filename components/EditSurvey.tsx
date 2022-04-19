import { Button, Input, Stack, Title } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import useSurvey from '../hooks/useSurvey';
import EditSurveyQuestion from './EditSurveyQuestion';

type Props = {
  surveyId: string;
};

const EditSurvey = (props: Props) => {
  const survey = useSurvey(props.surveyId);

  if (!survey.isFetched) return <div>not yet fetched</div>;

  return (
    <>
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

          <div>
            cancel button that deletes the whole survey after a modal
            confirmation, and save button that invalidates the survey so we
            fetch it again, and takes the user (somewhere?)
          </div>
          <div>{JSON.stringify(survey.data)}</div>
        </Stack>
      )}
      {/* <EditSurvey survey={survey.data!.data} /> */}
    </>
  );
};

export default EditSurvey;
