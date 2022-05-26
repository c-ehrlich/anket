import {
  Button,
  Center,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
  signIn,
  getSession,
} from 'next-auth/react';
import {
  BrandDiscord,
  BrandGithub,
  BrandGoogle,
  NorthStar,
} from 'tabler-icons-react';

function SignInPage(props: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  if (!props.providers) return <div>no providers</div>;

  return (
    <Center>
      <Paper
        shadow='md'
        radius='md'
        p='xl'
        withBorder
        style={{ maxWidth: '500px' }}
      >
        <Stack align='center'>
          <Title order={2}>Login</Title>
          <Text>
            If you do not yet have an Anket account, you will be prompted to
            link your provider account to Anket.
          </Text>
          <Text>
            If you already have an Anket account, please select the same
            provider that you previously created your account with.
          </Text>
          <Space h='xs' />
          <Stack>
            {Object.values(props.providers).map((provider) => (
              <Button
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl: process.env.NEXT_PUBLIC_URL })}
                size='lg'
                leftIcon={<GetProviderLogo id={provider.id} />}
              >
                Sign in with {provider.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Center>
  );
}

function GetProviderLogo({ id }: { id: string }) {
  switch (id) {
    case 'discord':
      return <BrandDiscord />;
    case 'github':
      return <BrandGithub />;
    case 'google':
      return <BrandGoogle />;
    case 'default':
      return <NorthStar />;
  }
  return <>{id}</>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      providers: await getProviders(),
    },
  };
};

export default SignInPage;
