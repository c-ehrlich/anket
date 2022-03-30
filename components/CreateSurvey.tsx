import {
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Input,
  NativeSelect,
  Paper,
  Stack,
} from '@mantine/core';
import { QuestionType, Survey } from '@prisma/client';
import React, { useState } from 'react';
import {
  CreateQuestionInput,
  CreateSurveyWithEverythingInput,
} from '../api/survey/survey.schema';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const tempSurvey: CreateSurveyWithEverythingInput = {
  name: 'test',
  description: 'test',
  questions: [
    {
      id: uuidv4(),
      question: 'question 1',
      details: 'details 1',
      isRequired: true,
      questionType: QuestionType.multipleChoiceSingle,
      multipleChoiceOptions: [{ name: 'answer1' }, { name: 'answer2' }],
    },
    {
      id: uuidv4(),
      question: 'question 2',
      details: '',
      isRequired: false,
      questionType: QuestionType.zeroToTen,
      multipleChoiceOptions: [],
    },
    {
      id: uuidv4(),
      question: 'question 3',
      details: 'details 3',
      isRequired: true,
      questionType: QuestionType.textResponse,
      multipleChoiceOptions: [],
    },
  ],
};

const defaultQuestion = () => {
  return {
    id: uuidv4(),
    question: 'REMOVE_ME',
    details: '',
    isRequired: true,
    questionType: QuestionType.multipleChoiceSingle,
    multipleChoiceOptions: [{ name: 'REMOVE_ME' }],
  };
};

const CreateSurvey = () => {
  const [survey, setSurvey] =
    useState<CreateSurveyWithEverythingInput>(tempSurvey);

  const addQuestion = () => {
    setSurvey({
      ...survey,
      questions: [...survey.questions, defaultQuestion()],
    });
  };

  const setQuestionTitle = (index: number, question: string) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        { ...survey.questions[index], question },
        survey.questions.slice(index + 1)
      ),
    });
  };

  const setQuestionDetails = (index: number, details: string) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        { ...survey.questions[index], details },
        survey.questions.slice(index + 1)
      ),
    });
  };

  const setQuestionIsRequired = (index: number, isRequired: boolean) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        { ...survey.questions[index], isRequired },
        survey.questions.slice(index + 1)
      ),
    });
  };

  const removeQuestionAtPosition = (index: number) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        survey.questions.slice(index + 1)
      ),
    });
  };

  const moveQuestionUp = (index: number) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index - 1),
        survey.questions[index],
        survey.questions[index - 1],
        survey.questions.slice(index + 1)
      ),
    });
  };

  const moveQuestionDown = (index: number) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        survey.questions[index + 1],
        survey.questions[index],
        survey.questions.slice(index + 2)
      ),
    });
  };

  return (
    <div>
      <div>Creating survey</div>
      <Input placeholder='Survey title' />
      <Input placeholder='Survey description' />
      <div>Question Count: {survey.questions.length}</div>
      <Stack>
        <AnimatePresence>
          {survey.questions.map(
            (question: CreateQuestionInput & { id?: string }, index) => (
              <motion.div key={question.id} layout>
                <Paper shadow='md' radius='md' p='md'>
                  <Group>
                    <Box sx={{ width: '100%'}}>
                      <Input
                        value={question.question}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setQuestionTitle(index, e.target.value)
                        }
                      />
                      <Input
                        value={question.details}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setQuestionDetails(index, e.target.value)
                        }
                      />
                      <Checkbox
                        label='Required'
                        checked={question.isRequired}
                        onChange={() =>
                          setQuestionIsRequired(index, !question.isRequired)
                        }
                      />
                      <NativeSelect
                        label='Question Type'
                        data={Object.values(QuestionType)}
                        required
                      />
                    </Box>
                    <Stack>
                      <Button onClick={() => removeQuestionAtPosition(index)}>
                        Remove
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={() => moveQuestionUp(index)}
                      >
                        Up
                      </Button>
                      <Button
                        disabled={index >= survey.questions.length - 1}
                        onClick={() => moveQuestionDown(index)}
                      >
                        Down
                      </Button>
                    </Stack>
                  </Group>
                </Paper>
              </motion.div>
            )
          )}
        </AnimatePresence>
        <Button onClick={addQuestion}>Add Question</Button>
      </Stack>
    </div>
  );
};

export default CreateSurvey;
