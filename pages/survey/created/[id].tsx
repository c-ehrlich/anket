import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import ThanksForCreatingSurvey from '../../../components/ThanksForCreatingSurvey';

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const SubmittedSurveyPage = (props: PageProps) => {
  return <ThanksForCreatingSurvey surveyId={props.surveyId} />;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const reqId = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id;
  const surveyId = reqId === undefined ? '0' : reqId;

  const session: Session | null = await getSession(ctx);

  return {
    props: {
      surveyId,
      ...session,
    },
  };
}

export default SubmittedSurveyPage;
