import { Button, Input, Stack, Title } from '@mantine/core';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';
import EditSurveyQuestion from './EditSurveyQuestion';

type Props = { survey: CreateDefaultSurveyResponse };

const EditSurvey = (props: Props) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const editSurveyCoreData = useMutation(
    (editedSurvey: Partial<CreateDefaultSurveyResponse>) => {
      console.log('survey id', props.survey.id);
      return axios.patch(`/api/survey/${props.survey.id}`, editedSurvey);
    },
    {
      onMutate: (newSurvey) => {
        const tempSurvey = {
          ...props.survey,
          ...newSurvey,
        };
        queryClient.setQueryData<CreateDefaultSurveyResponse>(
          ['survey', props.survey.id],
          () => {
            return tempSurvey;
          }
        );
      },
      // FIXME: type this
      onError: (error: any) => window.alert(JSON.stringify(error.response)),
      onSettled: () => queryClient.invalidateQueries(['survey', props.survey.id])
    }
  );

  const handleEditSurveyCoreData = ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    setName(name);
    setDescription(description);
    editSurveyCoreData.mutate({ name, description });
  };

  const createQuestionRequest = async (
    surveyId: string
  ): Promise<QuestionResponse> => {
    const question = await axios
      .post('/api/question', { surveyId })
      .then((res) => res.data);
    return question;
  };

  const createQuestion = useMutation(
    ['create-survey'],
    // TODO we don't know our survey id!!! pass it down??? or pass down the whole survey?
    (surveyId: string) => createQuestionRequest(surveyId),
    {
      // onMutate: (partialQuestion) => {
      //   // TODO... maybe insert a temporary question? or is it a bad idea because we don't want to
      //   // const newQuestion = {
      //   //   id: 'aaaaaa',
      //   //   etc: aaaaaa
      //   // }
      // },
      onError: (error: any) => window.alert(error.response),
      onSettled: () => {
        queryClient.invalidateQueries(['create-survey']);
      },
    }
  );

  const addQuestion = () => {
    createQuestion.mutate(props.survey.id);
  };

  return (
    <Stack>
      <Title order={2}>Creating survey</Title>
      <Input
        placeholder='Survey name'
        value={name}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          handleEditSurveyCoreData({
            name: e.currentTarget.value,
            description,
          })
        }
      />

      <Input
        placeholder='Survey description'
        value={description}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          handleEditSurveyCoreData({
            name,
            description: e.currentTarget.value,
          })
        }
      />

      <Stack>
        <Title order={3}>Questions</Title>
        <AnimatePresence>
          {props.survey.questions.map((question, index) => (
            <motion.div key={question.id}>
              <EditSurveyQuestion question={question} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>

      <Button onClick={addQuestion}>Add Question</Button>

      <div>
        cancel button that deletes the whole survey after a modal confirmation,
        and save button that invalidates the survey so we fetch it again, and
        takes the user (somewhere?)
      </div>
      <div>{JSON.stringify(props.survey)}</div>
    </Stack>
  );
};

export default EditSurvey;
