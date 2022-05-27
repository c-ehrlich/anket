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
import { DashboardSurveyParticipation } from '../backend/surveyParticipation/surveyParticipation.schema';
import { ChartBar, Edit, Eye, Tool } from 'tabler-icons-react';
import { SurveyPreviewWithAuthorAndInteraction } from '../backend/survey/survey.schema';
import { useRouter } from 'next/router';

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
      <Title order={2}>Created Surveys</Title>
      {mySurveysData !== undefined && newParticipationsCount !== undefined ? (
        <>
          {unfinishedSurveys.length > 0 ? (
            <>
              <Text size='lg'>
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
              <Text size='lg'>
                Here {finishedSurveys.length === 1 ? 'is' : 'are'} your{' '}
                {Math.min(3, finishedSurveys.length)} most recently created{' '}
                {finishedSurveys.length === 1 ? 'survey' : 'surveys'}
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
          <Button onClick={() => router.push(`/survey/create`)}>
            New Survey
          </Button>

          <Text size='lg'>
            There were {newParticipationsCount} new responses to your surveys in
            the last 24 hours.
          </Text>
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
      {myParticipations !== undefined ? (
        <>
          {myUnfinishedParticipations !== undefined && (
            <>
              <Text size='lg'>
                You have {myUnfinishedParticipations.length} unfinished{' '}
                {myUnfinishedParticipations.length === 1
                  ? 'participation'
                  : 'participations'}
              </Text>
              {myUnfinishedParticipations.map((p) => (
                <TakenSurveyCard key={p.id} participation={p} />
              ))}
            </>
          )}
          {myFinishedParticipations !== undefined && (
            <>
              <Text size='lg'>
                Here {myFinishedParticipations.length === 1 ? 'is' : 'are'} your{' '}
                {Math.min(3, myFinishedParticipations.length)} most recently
                completed{' '}
                {myFinishedParticipations.length === 1
                  ? 'participation'
                  : 'participations'}
              </Text>
              {myFinishedParticipations.slice(0, 3).map((p) => (
                <TakenSurveyCard key={p.id} participation={p} />
              ))}
            </>
          )}
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
            <Title order={3}>
              {survey.name !== '' ? survey.name : '(no title)'}
            </Title>
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
                <Group>
                  <Button
                    onClick={() => router.push(`/survey/stats/${survey.id}`)}
                    leftIcon={<ChartBar />}
                    variant='outline'
                  >
                    Stats
                  </Button>
                  <Button
                    onClick={() => router.push(`/survey/edit/${survey.id}`)}
                    leftIcon={<Tool />}
                    variant='outline'
                  >
                    Edit
                  </Button>
                </Group>
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
                  leftIcon={<Eye />}
                  variant='outline'
                >
                  View
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    router.push(`/survey/take/${participation.survey.id}`)
                  }
                  leftIcon={<Edit />}
                  variant='outline'
                >
                  Resume
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
