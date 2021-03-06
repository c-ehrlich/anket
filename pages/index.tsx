import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import LandingPage from '../components/LandingPage';

const Home: NextPage = () => {
  return <LandingPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
};

export default Home;
