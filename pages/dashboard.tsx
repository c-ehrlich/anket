import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import Dashboard from '../components/Dashboard';

const AllSurveys = () => {
    return <Dashboard />
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
};

export default AllSurveys;
