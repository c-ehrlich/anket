import { Group, Input, NativeSelect, Paper, Stack, Title } from '@mantine/core';
import { QuestionType } from '@prisma/client';
import React from 'react';
import { QuestionResponse } from '../api/question/question.schema';

type Props = { question: QuestionResponse, index: number };

const EditSurveyQuestion = (props: Props) => {
  return (
    <Paper shadow='lg' radius='md' p='md'>
      <Group align='flex-start'>
        <Stack sx={{ flexGrow: 1 }}>
          <Title order={3}>Question {props.index + 1}</Title>
          <Input
            value={props.question.question}
            onChange={(e: React.FormEvent<HTMLInputElement>) => editTest(e)}
          />
          <Input
            value={props.question.details}
            onChange={(e: React.FormEvent<HTMLInputElement>) => editTest(e)}
          />
          <NativeSelect
            label='Question Type'
            data={Object.values(QuestionType)}
            onChange={() => {}}
          />
        </Stack>
      </Group>
    </Paper>
  );
};

export default EditSurveyQuestion;
