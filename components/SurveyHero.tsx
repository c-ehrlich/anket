import {
  Avatar,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { SurveyWithAuthor } from '../types/survey';

type Props = {
  survey: SurveyWithAuthor;
};

const SurveyHero = (props: Props) => {
  const theme = useMantineTheme();

  return (
    <Card shadow='sm' p='lg'>
      <Card.Section>
        <Image src='https://picsum.photos/600/300' height={160} alt='Norway' />
      </Card.Section>
      <Stack style={{ marginTop: theme.spacing.sm }}>
        <Title order={3}>{props.survey.name}</Title>
        <Text>{props.survey.description}</Text>
        <Group>
          <Avatar src={props.survey.author.image} radius='xl' />
          <Text size='sm' lineClamp={2} weight={500}>
            {props.survey.author!.name}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default SurveyHero;
