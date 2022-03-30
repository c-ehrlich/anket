import { Box, useMantineTheme } from '@mantine/core';
import { useSession, signIn, signOut } from 'next-auth/react';

const Content = () => {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <>
        Signed in as {JSON.stringify(session)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const Login = () => {
  const theme = useMantineTheme();
  
  return (
    <Box sx={{
      paddingTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    }}>
      <Content />
    </Box>
  )
};

export default Login;
