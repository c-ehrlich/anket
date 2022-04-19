import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import React from 'react';
import { SurveyWithAuthor } from '../types/survey';
import { Edit } from 'tabler-icons-react';
import Link from 'next/link';

type Props = {
  survey: SurveyWithAuthor;
};

const SurveyHero = (props: Props) => {
  const { data: session } = useSession();
  const theme = useMantineTheme();

  return (
    <Card shadow='sm' p='lg'>
      <Card.Section>
        <Image src='https://picsum.photos/600/300' height={160} alt='Norway' />
      </Card.Section>
      <Stack style={{ marginTop: theme.spacing.sm }}>
        <Group style={{ justifyContent: 'space-between' }}>
          <Title order={3}>
            {props.survey.name !== '' ? props.survey.name : '(no name)'}
          </Title>
          {props.survey.author.id === session?.user?.id && (
            <Link href={`/survey/edit/${props.survey.id}`} passHref>
              <ActionIcon>
                <Edit />
              </ActionIcon>
            </Link>
          )}
        </Group>
        <Text>
          {props.survey.description !== ''
            ? props.survey.description
            : '(no description)'}
        </Text>
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
