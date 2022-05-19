import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
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
import { AlertTriangle, Check, Dots, Edit, Square } from 'tabler-icons-react';
import Link from 'next/link';
import { SurveyPreviewWithAuthorAndInteraction } from '../api/survey/survey.schema';

type Props = {
  survey: SurveyPreviewWithAuthorAndInteraction;
};

const SurveyHero = (props: Props) => {
  const { data: session } = useSession();
  const theme = useMantineTheme();

  if (!session) return null;

  if (!session.user) return <div>No user</div>;

  return (
    <Card shadow='sm' p='lg' withBorder>
      <Card.Section>
        <Image
          src='https://picsum.photos/600/300'
          height={160}
          alt='Survey Header Image'
        />
      </Card.Section>
      <Stack spacing='sm' style={{ marginTop: theme.spacing.sm }}>
        <Group style={{ justifyContent: 'space-between' }}>
          <Title order={3}>
            <Group>
              <div>
                {props.survey.name !== '' ? props.survey.name : '(no name)'}
              </div>
              {props.survey.author.id === session?.user?.id && (
                // author owns survey
                <>
                  {props.survey.isCompleted ? (
                    <Badge
                      size='lg'
                      variant='outline'
                      leftSection={
                        <Check
                          size={22}
                          style={{ position: 'relative', top: '4px' }}
                        />
                      }
                    >
                      Created
                    </Badge>
                  ) : (
                    <Badge
                      size='lg'
                      variant='outline'
                      color='yellow'
                      leftSection={
                        <AlertTriangle
                          size={22}
                          style={{ position: 'relative', top: '4px' }}
                        />
                      }
                    >
                      Incomplete
                    </Badge>
                  )}
                </>
              )}
            </Group>
          </Title>
          {props.survey.author.id === session?.user?.id ? (
            <Link href={`/survey/edit/${props.survey.id}`} passHref>
              <ActionIcon>
                <Edit />
              </ActionIcon>
            </Link>
          ) : props.survey.participations?.length !== 0 ? (
            <>
              {props.survey.participations[0]?.isComplete ? (
                <Group spacing='xs'>
                  <Check />
                  <Text>Completed</Text>
                </Group>
              ) : (
                <Group spacing='xs'>
                  <Dots />
                  <Text>In Progress</Text>
                </Group>
              )}
            </>
          ) : (
            // survey not started
            null
          )}
        </Group>
        <div>
          <Link passHref href={`/user/${props.survey.author.id}`}>
            <Badge
              color='gray'
              size='lg'
              variant='outline'
              leftSection={
                <Avatar
                  src={props.survey.author.image}
                  radius='xl'
                  size={25}
                  mr={5}
                />
              }
              sx={{ paddingLeft: 0, cursor: 'pointer' }}
              styles={{ inner: { textTransform: 'none' } }}
            >
              {props.survey.author.name}
            </Badge>
          </Link>
        </div>
        <Text>
          {props.survey.description !== ''
            ? props.survey.description
            : '(no description)'}
        </Text>
        {props.survey.author.id === session?.user?.id ? null : props.survey
            .participations && props.survey.participations[0] ? (
          <div>
            {props.survey.participations[0].isComplete ? (
              <Button variant='outline'>Modify Response</Button>
            ) : (
              <Button>Resume Survey</Button>
            )}
          </div>
        ) : (
          // survey not started
          <div>
            <Button variant='outline'>Take Survey</Button>
          </div>
        )}
      </Stack>
    </Card>
  );
};

export default SurveyHero;
