import { Button, Paper, Stack, Title } from '@mantine/core';
import React from 'react';

type Props = {
  options: { name: string }[];
};

const CreateSurveyMultipleChoiceOptions = (props: Props) => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <Stack >
        <Title order={4}>Answer Options</Title>
        {props.options.map((option) => (
          <div key={option.name}>{option.name}</div>
        ))}
        <Button>Add Option</Button>
      </Stack>
    </Paper>
  );
};

export default CreateSurveyMultipleChoiceOptions;
