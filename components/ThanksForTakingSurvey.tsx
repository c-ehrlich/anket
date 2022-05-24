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
        <div style={{ maxHeight: '300px' }}>
          {/* TODO: in production, use Next Image and fix the hosts issue by using something
           * like Cloudinary fetch: https://cloudinary.com/documentation/fetch_remote_images
           */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={interaction.data.picture}
            alt={`Survey Header Image: ${interaction.data.picture}`}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>
        <Title order={4}>
          You completed the survey &quot;
          <strong>{interaction.data.name}</strong>&quot;.
        </Title>
        <Box>
          <Button onClick={() => router.push('/')}>Go to Dashboard</Button>
        </Box>
      </Stack>
    </Center>
  );
};

export default ThanksForTakingSurvey;
