import { Avatar, Group, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import useGetUserProfileWithSurveys from '../hooks/useGetUserProfileWithSurveys';
import SurveyHero from './SurveyHero';

type Props = {
  userId: string;
};

const UserProfile = (props: Props) => {
  const profile = useGetUserProfileWithSurveys(props.userId);

  if (!profile.data) return <div>no data yet</div>;

  return (
    <Stack>
      <Paper shadow='sm' p='lg' withBorder>
        <Group align={'flex-start'}>
          <Avatar radius={500} size='xl' src={profile.data.image} />
          <Stack spacing={1}>
            <Title order={2}>{profile.data.name}</Title>
            <Text>{profile.data.email}</Text>
            <Text>Public Surveys: {profile.data.surveys.length}</Text>
          </Stack>
        </Group>
      </Paper>
      <>
        {profile.data.surveys &&
          profile.data.surveys.map((survey) => (
            <SurveyHero
              survey={{
                ...survey,
                author: {
                  name: profile.data.name,
                  id: profile.data.id,
                  image: profile.data.image,
                },
              }}
              key={survey.id}
            />
          ))}
      </>
    </Stack>
  );
};

export default UserProfile;
