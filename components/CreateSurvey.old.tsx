import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Input,
  NativeSelect,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { QuestionType, Survey } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import {
  CreateQuestionInput,
  CreateSurveyWithEverythingInput,
} from '../api/survey/survey.schema';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { CaretUp, CaretDown, Trash } from 'tabler-icons-react';
import CreateSurveyMultipleChoiceOptions from './CreateSurveyMultipleChoiceOptions';

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

  useEffect(() => console.log(survey));

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

  const setQuestionType = (index: number, questionType: QuestionType) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        { ...survey.questions[index], questionType },
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

  const addAnswerOptionToQuestion = (index: number) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        {
          ...survey.questions[index],
          multipleChoiceOptions: [
            ...survey.questions[index].multipleChoiceOptions!,
            { name: '' },
          ],
        },
        survey.questions.slice(index + 1)
      ),
    });
  };

  const removeAnswerOptionFromQuestion = (questionIndex: number, answerIndex: number) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, questionIndex),
        {
          ...survey.questions[questionIndex],
          multipleChoiceOptions: ([] as any).concat(
            survey.questions[questionIndex].multipleChoiceOptions!.slice(0, answerIndex),
            survey.questions[questionIndex].multipleChoiceOptions!.slice(answerIndex + 1),
          ),
        },
        survey.questions.slice(questionIndex + 1)
      ),
    });
  }

  const setAnswerOptionText = (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, questionIndex),
        {
          ...survey.questions[questionIndex],
          multipleChoiceOptions: ([] as any).concat(
            survey.questions[questionIndex].multipleChoiceOptions!.slice(0, answerIndex),
            { name: text },
            survey.questions[questionIndex].multipleChoiceOptions!.slice(answerIndex + 1),
          ),
        },
        survey.questions.slice(questionIndex + 1)
      ),
    });
  };

  return (
    <Stack>
      <Title order={2}>Creating survey</Title>
      <Input placeholder='Survey title' />
      <Input placeholder='Survey description' />
      <Stack>
        <AnimatePresence>
          {survey.questions.map(
            (question: CreateQuestionInput & { id?: string }, index) => (
              <motion.div key={question.id} layout>
                <Paper shadow='md' radius='md' p='md'>
                  <Group align='flex-start'>
                    <Stack sx={{ flexGrow: 1 }}>
                      <Title order={3}>Question {index + 1}</Title>
                      <Stack sx={{ width: '100%' }}>
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
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setQuestionType(index, e.target.value)
                          }
                        />
                      </Stack>
                      {(question.questionType === 'multipleChoiceMultiple' ||
                        question.questionType === 'multipleChoiceSingle') && (
                        <CreateSurveyMultipleChoiceOptions
                          questionIndex={index}
                          options={question.multipleChoiceOptions!}
                          addOption={() => addAnswerOptionToQuestion(index)}
                          removeAnswerOptionFromQuestion={removeAnswerOptionFromQuestion}
                          setAnswerOptionText={setAnswerOptionText}
                        />
                      )}
                    </Stack>

                    <Stack justify='space-between'>
                      <Stack>
                        <ActionIcon
                          variant='default'
                          disabled={index === 0}
                          onClick={() => moveQuestionUp(index)}
                        >
                          <CaretUp />
                        </ActionIcon>
                        <ActionIcon
                          variant='default'
                          disabled={index >= survey.questions.length - 1}
                          onClick={() => moveQuestionDown(index)}
                        >
                          <CaretDown />
                        </ActionIcon>
                      </Stack>
                      <ActionIcon
                        variant='default'
                        onClick={() => removeQuestionAtPosition(index)}
                      >
                        <Trash />
                      </ActionIcon>
                    </Stack>
                  </Group>
                </Paper>
              </motion.div>
            )
          )}
        </AnimatePresence>
        <Button onClick={addQuestion}>Add Question</Button>
      </Stack>
    </Stack>
  );
};

export default CreateSurvey;
