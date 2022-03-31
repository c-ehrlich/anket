import {
  ActionIcon,
  Button,
  Group,
  Input,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import React from 'react';

type Props = {
  questionIndex: number;
  options: { name: string }[];
  addOption: () => void;
  removeAnswerOptionFromQuestion: (
    questionIndex: number,
    answerIndex: number
  ) => void;
  setAnswerOptionText: (
    questionIndex: number,
    answerIndex: number,
    text: string
  ) => void;
};

const CreateSurveyMultipleChoiceOptions = (props: Props) => {
  return (
    <Paper shadow='sm' p='md' withBorder>
      <Stack>
        <Title order={4}>Answer Options</Title>
        {props.options.map((option, answerIndex) => (
          <Group key={option.name}>
            <Input
              placeholder='Answer text'
              value={option.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.setAnswerOptionText(
                  props.questionIndex,
                  answerIndex,
                  e.target.value
                )
              }
              sx={{ flex: 1 }}
            />
            <ActionIcon
              variant='default'
              onClick={() =>
                props.removeAnswerOptionFromQuestion(
                  props.questionIndex,
                  answerIndex
                )
              }
            >
              <Trash />
            </ActionIcon>
          </Group>
        ))}
        <Button onClick={props.addOption}>Add Option</Button>
      </Stack>
    </Paper>
  );
};

export default CreateSurveyMultipleChoiceOptions;
