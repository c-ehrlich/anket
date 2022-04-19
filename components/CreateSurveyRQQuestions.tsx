import {
  Button,
  Group,
  Input,
  NativeSelect,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { QuestionType } from '@prisma/client';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QuestionResponse } from '../api/question/question.schema';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

interface Props {
  survey: CreateDefaultSurveyResponse;
}

const CreateSurveyRQQuestions = (props: Props) => {
  const queryClient = useQueryClient();
  const editTest = (e: React.FormEvent) => console.log(e);

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
    createQuestion.mutate(props.survey.id)
  }

  return (
    <Stack>
      <div>CreateSurveyRQQuestions</div>
      <AnimatePresence>
        {props.survey.questions.map((question: QuestionResponse, index) => (
          <motion.div key={question.id}>
            <Paper shadow='lg' radius='md' p='md'>
              <Group align='flex-start'>
                <Stack sx={{ flexGrow: 1 }}>
                  <Title order={3}>Question {index + 1}</Title>
                  <Input
                    value={question.question}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      editTest(e)
                    }
                  />
                  <Input
                    value={question.details}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      editTest(e)
                    }
                  />
                  <NativeSelect
                    label='Question Type'
                    data={Object.values(QuestionType)}
                    onChange={() => {}}
                  />
                </Stack>
              </Group>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button onClick={addQuestion}>Add Question</Button>
    </Stack>
  );
};

export default CreateSurveyRQQuestions;
