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
import { AlertTriangle, ChartBar, Check, Dots, Edit } from 'tabler-icons-react';
import Link from 'next/link';
import { SurveyPreviewWithAuthorAndInteraction } from '../backend/survey/survey.schema';

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
          src={props.survey.picture}
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
            <Group>
              {props.survey.isCompleted && (
                <Link href={`/survey/stats/${props.survey.id}`} passHref>
                  <ActionIcon>
                    <ChartBar />
                  </ActionIcon>
                </Link>
              )}
              <Link href={`/survey/edit/${props.survey.id}`} passHref>
                <ActionIcon>
                  <Edit />
                </ActionIcon>
              </Link>
            </Group>
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
          ) : // survey not started
          null}
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
        <Text style={{ whiteSpace: 'pre-line' }}>
          {props.survey.description !== ''
            ? props.survey.description
            : '(no description)'}
        </Text>
        {props.survey.author.id === session?.user?.id ? null : props.survey
            .participations && props.survey.participations[0] ? (
          <div>
            {props.survey.participations[0].isComplete ? (
              <Link href={`/survey/take/${props.survey.id}`} passHref>
                <Button variant='outline'>Modify Response</Button>
              </Link>
            ) : (
              <Link href={`/survey/take/${props.survey.id}`} passHref>
                <Button>Resume Survey</Button>
              </Link>
            )}
          </div>
        ) : (
          // survey not started
          <div>
            <Link href={`/survey/take/${props.survey.id}`} passHref>
              <Button variant='outline'>Take Survey</Button>
            </Link>
          </div>
        )}
      </Stack>
    </Card>
  );
};

export default SurveyHero;
