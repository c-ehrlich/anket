import { Box, Button, Center, Stack, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import useGetOrCreateSurveyParticipation from '../hooks/surveyParticipation/useGetOrCreateSurveyParticipation';
import Confetti from 'react-confetti';
import { useRouter } from 'next/router';

const ThanksForTakingSurvey = ({ surveyId }: { surveyId: string }) => {
  const interaction = useGetOrCreateSurveyParticipation({ surveyId });
  const viewport = useViewportSize();
  const router = useRouter();

  if (interaction.isError)
    return <div>{JSON.stringify(interaction.error)}</div>;
  if (!interaction.data) return <div>Loading...</div>;

  if (!interaction.data.participations[0].isComplete) router.push('/');

  return (
    <Center>
      <Confetti width={viewport.width} height={viewport.height} />
      <Stack align='center' justify='center'>
        <Title align='center' order={1}>
          🎉 Thank you! 🎉
        </Title>
        <Title order={4}>
          You completed the survey &quot;<strong>{interaction.data.name}</strong>&quot;.
        </Title>
        <Box>
          <Button>Go to Dashboard</Button>
        </Box>
      </Stack>
    </Center>
  );
};

export default ThanksForTakingSurvey;
