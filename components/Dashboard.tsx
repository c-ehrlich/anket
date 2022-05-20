import {
  Avatar,
  Box,
  Button,
  Center,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMemo } from 'react';
import useGetMySurveys from '../hooks/useGetMySurveys';
import useGetMySurveyParticipations from '../hooks/useGetMySurveyParticipations';
import useGetNewParticipationsCount from '../hooks/useGetNewParticipationsCount';
import { MoonLoader } from 'react-spinners';
import { DashboardSurveyParticipation } from '../api/surveyParticipation/surveyParticipation.schema';
import { Edit, Eye, Router } from 'tabler-icons-react';
import { SurveyPreviewWithAuthorAndInteraction } from '../api/survey/survey.schema';
import { useRouter } from 'next/router';
import { createSurvey } from '../hooks/useCreateSurvey';

// TODO switch between rows/columns based on useQuerySelector

function Dashboard() {
  return (
    <Stack align='stretch' sx={{ width: '100%' }}>
      {/* <Title order={1}>{props.session.user && props.session.user?.name ? `Welcome, ${props.session.user.name}` : 'Welcome to Anket'}</Title> */}
      <SimpleGrid
        spacing={32}
        cols={2}
        breakpoints={[{ maxWidth: 1000, cols: 1 }]}
      >
        <MySurveys />
        <TakenSurveys />
      </SimpleGrid>
    </Stack>
  );
}

function MySurveys() {
  const router = useRouter();

  const { data: mySurveysData } = useGetMySurveys();
  const { data: newParticipationsCount } = useGetNewParticipationsCount();

  const unfinishedSurveys = useMemo(() => {
    return mySurveysData
      ? mySurveysData.filter((s) => s.isCompleted === false)
      : [];
  }, [mySurveysData]);

  const finishedSurveys = useMemo(() => {
    return mySurveysData
      ? mySurveysData.filter((s) => s.isCompleted === true)
      : [];
  }, [mySurveysData]);

  return (
    // <Paper withBorder shadow='md' p='md'>
    <Stack>
      <Title order={2}>My Surveys</Title>
      {mySurveysData !== undefined && newParticipationsCount !== undefined ? (
        <>
          {unfinishedSurveys.length > 0 ? (
            <>
              <Text>
                You have {unfinishedSurveys.length} unfinished{' '}
                {unfinishedSurveys.length === 1 ? 'survey' : 'surveys'}
              </Text>
              {unfinishedSurveys.map((s) => (
                <CreatedSurveyCard key={s.id} survey={s} />
              ))}
            </>
          ) : null}
          {finishedSurveys.length > 0 ? (
            <>
              <Text>
                You have created {finishedSurveys.length} surveys. Here are the
                most recent {Math.min(3, finishedSurveys.length)}.
              </Text>
              {finishedSurveys.slice(0, 3).map((s) => (
                <CreatedSurveyCard key={s.id} survey={s} />
              ))}
            </>
          ) : (
            <Stack>
              <Text>
                You have not yet made any surveys. Why not get started now?
              </Text>
            </Stack>
          )}
          <Button
            onClick={() =>
              createSurvey().then((survey) =>
                router.push(`/survey/edit/${survey.id}`)
              )
            }
          >
            New Survey
          </Button>

          <div>
            There were {newParticipationsCount} new responses to your surveys in
            the last 24 hours.
          </div>
        </>
      ) : (
        <Center>
          <MoonLoader color='green' />
        </Center>
      )}
    </Stack>
    // </Paper>
  );
}

function TakenSurveys() {
  const { data: myParticipations } = useGetMySurveyParticipations();

  const myFinishedParticipations = useMemo(() => {
    return myParticipations?.filter((p) => p.isComplete);
  }, [myParticipations]);

  const myUnfinishedParticipations = useMemo(() => {
    return myParticipations?.filter((p) => !p.isComplete);
  }, [myParticipations]);

  return (
    // <Paper withBorder shadow='md' p='md'>
    <Stack>
      <Title order={2}>Taken Surveys</Title>
      {myUnfinishedParticipations !== undefined && (
        <>
          <Text>
            You have {myUnfinishedParticipations.length} unfinished
            participations
          </Text>
          {myUnfinishedParticipations.map((p) => (
            <TakenSurveyCard key={p.id} participation={p} />
          ))}
        </>
      )}
      {myFinishedParticipations !== undefined && (
        <>
          <Text>
            Here are your {Math.min(3, myFinishedParticipations.length)} most
            recent completed participations
          </Text>
          {myFinishedParticipations.slice(0, 3).map((p) => (
            <TakenSurveyCard key={p.id} participation={p} />
          ))}
        </>
      )}
    </Stack>
    // </Paper>
  );
}

function CreatedSurveyCard({
  survey,
}: {
  survey: SurveyPreviewWithAuthorAndInteraction;
}) {
  const router = useRouter();

  return (
    <Stack>
      <Paper p='md' withBorder shadow='md'>
        <Group align='start'>
          <Avatar size='lg' radius='xl' src={survey.author.image} />
          <Stack spacing={1}>
            <Title order={3}>{survey.name}</Title>
            <Text color='dimmed'>by {survey.author.name}</Text>
            <Box sx={{ marginTop: '8px' }}>
              {!survey.isCompleted ? (
                <Button
                  onClick={() => router.push(`/survey/edit/${survey.id}`)}
                  leftIcon={<Edit />}
                  variant='outline'
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={() => router.push(`/survey/edit/${survey.id}`)}
                  leftIcon={<Eye />}
                  variant='outline'
                >
                  View
                </Button>
              )}
            </Box>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
}

function TakenSurveyCard({
  participation,
}: {
  participation: DashboardSurveyParticipation;
}) {
  const router = useRouter();

  return (
    <Stack>
      <Paper p='md' withBorder shadow='md'>
        <Group align='start'>
          <Avatar
            size='lg'
            radius='xl'
            src={participation.survey.author.image}
          />
          <Stack spacing={1}>
            <Title order={3}>{participation.survey.name}</Title>
            <Text color='dimmed'>by {participation.survey.author.name}</Text>
            <Box sx={{ marginTop: '8px' }}>
              {participation.isComplete ? (
                <Button
                  onClick={() =>
                    router.push(`/survey/take/${participation.survey.id}`)
                  }
                  leftIcon={<Edit />}
                  variant='outline'
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    router.push(`/survey/take/${participation.survey.id}`)
                  }
                  leftIcon={<Eye />}
                  variant='outline'
                >
                  View
                </Button>
              )}
            </Box>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
}

export default Dashboard;
