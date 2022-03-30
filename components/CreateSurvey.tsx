import { Button, Input } from '@mantine/core';
import { QuestionType, Survey } from '@prisma/client';
import React, { useState } from 'react';
import {
  CreateQuestionInput,
  CreateSurveyWithEverythingInput,
} from '../api/survey/survey.schema';

const tempSurvey: CreateSurveyWithEverythingInput = {
  name: 'test',
  description: 'test',
  questions: [
    {
      question: 'question 1',
      details: 'details 1',
      isRequired: true,
      questionType: QuestionType.multipleChoiceSingle,
      multipleChoiceOptions: [{ name: 'answer1' }, { name: 'answer2' }],
    },
    {
      question: 'question 2',
      details: '',
      isRequired: false,
      questionType: QuestionType.zeroToTen,
      multipleChoiceOptions: [],
    },
    {
      question: 'question 3',
      details: 'details 3',
      isRequired: true,
      questionType: QuestionType.textResponse,
      multipleChoiceOptions: [],
    },
  ],
};

const defaultQuestion = {
  question: 'REMOVE_ME',
  details: '',
  isRequired: true,
  questionType: QuestionType.multipleChoiceSingle,
  multipleChoiceOptions: [{ name: 'REMOVE_ME' }],
};

const CreateSurvey = () => {
  const [survey, setSurvey] =
    useState<CreateSurveyWithEverythingInput>(tempSurvey);

  const addQuestion = () => {
    setSurvey({
      ...survey,
      questions: [...survey.questions, defaultQuestion],
    });
  };

  const setQuestionTitle = (index: number, question: string) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        { ...survey.questions[index], question },
        survey.questions.slice(index + 1)
      )
    })
  }

  const setQuestionDetails = (index: number, details: string) => {
    setSurvey({
      ...survey,
      questions: ([] as CreateQuestionInput[]).concat(
        survey.questions.slice(0, index),
        { ...survey.questions[index], details },
        survey.questions.slice(index + 1)
      )
    })
  }

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
      {survey.questions.map((question, index) => (
        <div key={`question-${index}`}>
          <Input value={question.question} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestionTitle(index, e.target.value)} />
          <Input value={question.details} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestionDetails(index, e.target.value)} />
          <Button onClick={() => removeQuestionAtPosition(index)}>
            Remove
          </Button>
          {index !== 0 && (
            <Button onClick={() => moveQuestionUp(index)}>Up</Button>
          )}
          {index < survey.questions.length - 1 && (
            <Button onClick={() => moveQuestionDown(index)}>Down</Button>
          )}
        </div>
      ))}
      <Button onClick={addQuestion}>Add Question</Button>
    </div>
  );
};

export default CreateSurvey;
