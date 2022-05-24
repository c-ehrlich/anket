import { Box, Button, Center, Stack, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Confetti from 'react-confetti';
import { useRouter } from 'next/router';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';

const ThanksForCreatingSurvey = ({ surveyId }: { surveyId: string }) => {
  const survey = useGetSingleSurvey(surveyId);
  const viewport = useViewportSize();
  const router = useRouter();

  if (survey.isError) return <div>{JSON.stringify(survey.error)}</div>;
  if (!survey.data) return <div>Loading...</div>;

  if (!survey.data.isCompleted) router.push('/');

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
            src={survey.data.picture}
            alt={`Survey Header Image: ${survey.data.name}`}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>
        <Title order={4}>
          You created the survey &quot;<strong>{survey.data.name}</strong>
          &quot;.
        </Title>
        <Box>
          <Button onClick={() => router.push('/')}>Go to Dashboard</Button>
        </Box>
      </Stack>
    </Center>
  );
};

export default ThanksForCreatingSurvey;
