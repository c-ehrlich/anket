import { Divider, Stack, Title } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import React from 'react';
import Dashboard from '../components/Dashboard';

const AllSurveys = ({ ...props }) => {
  return (
    <Stack>
      <Title order={1}>
        {props.user.name ? `✅ Hi ${props.user.name.split(' ')[0]}, Welcome to Anket` : JSON.stringify(props.user)}
      </Title>
      <Divider />
      <Dashboard />
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session | null = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { foo: 'bar', ...session },
  };
};

export default AllSurveys;
