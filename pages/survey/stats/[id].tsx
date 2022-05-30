import { Center, Title } from '@mantine/core';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useGetSurveyStats from '../../../hooks/useGetSurveyStats';
import { MoonLoader } from 'react-spinners';
import SurveyStats from '../../../components/SurveyStats';
import logger from '../../../backend/utils/logger';

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const SurveyStatsPage = (props: PageProps) => {
  const router = useRouter();
  const session = useSession();
  const surveyStats = useGetSurveyStats(props.surveyId);

  if (surveyStats.isError) {
    return (
      <Center>
        <Title order={2}>Error: {JSON.stringify(surveyStats.error)}</Title>
      </Center>
    );
  }

  if (
    session.data?.user?.id &&
    surveyStats.data?.author.id &&
    session.data.user.id !== surveyStats.data.author.id
  ) {
    logger.error('auth failed');
    router.push('/');
  }

  if (!session.data?.user?.id || !surveyStats.data?.author.id) {
    return (
      <Center>
        <MoonLoader />
      </Center>
    );
  }

  if (
    session.data?.user?.id &&
    surveyStats.data?.author.id &&
    session.data.user.id === surveyStats.data.author.id
  ) {
    return <SurveyStats survey={surveyStats.data} />;
  }
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const reqId = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id;
  const surveyId = reqId === undefined ? '0' : reqId;

  const session: Session | null = await getSession(ctx);

  return {
    props: {
      surveyId,
    },
  };
}

export default SurveyStatsPage;
