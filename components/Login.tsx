import {
  Avatar,
  Box,
  Group,
  MediaQuery,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Logout } from 'tabler-icons-react';
import { AnimatePresence, motion } from 'framer-motion';

const Content = () => {
  const { data: session } = useSession();
  const theme = useMantineTheme();
  const [onLogoutPage, setOnLogoutPage] = useState<boolean>(false);

  const logoutAndResetState = () => {
    signOut();
    setOnLogoutPage(false);
  };

  if (session && session.user) {
    return (
      <>
        {onLogoutPage ? (
          <Box
            key='logout-element'
            component={motion.div}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Group>
              <UnstyledButton
                onClick={() => setOnLogoutPage(false)}
                sx={{
                  height: '100%',
                  display: 'block',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[0]
                      : theme.black,

                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                }}
              >
                <ChevronLeft />
              </UnstyledButton>
              <UnstyledButton
                onClick={logoutAndResetState}
                sx={{
                  flexGrow: 1,
                  display: 'block',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[0]
                      : theme.black,

                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                }}
              >
                <Group>
                  <Box sx={{ flexGrow: 1 }}>
                    <Text align='right' size='sm' lineClamp={2} weight={500}>
                      Logout
                    </Text>
                  </Box>
                  <Logout size={24} />
                </Group>
              </UnstyledButton>
            </Group>
          </Box>
        ) : (
          <Box
            key='user-element'
            component={motion.div}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UnstyledButton
              onClick={() => setOnLogoutPage(true)}
              sx={{
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black,

                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              }}
            >
              <Group position='apart'>
                <Avatar src={session.user.image} radius='xl' />
                <MediaQuery smallerThan='lg' styles={{ display: 'none' }}>

                <Box sx={{ flex: 1 }}>
                  <Text size='sm' lineClamp={2} weight={500}>
                    {session.user.name}
                  </Text>
                </Box>
                </MediaQuery>

                {theme.dir === 'ltr' ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </Group>
            </UnstyledButton>
          </Box>
        )}
      </>
    );
  }
  return (
    <UnstyledButton
      onClick={() => signIn()}
      sx={{
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      }}
    >
      <Group>
        <Avatar src={undefined} radius='xl' />
        <Box sx={{ flex: 1 }}>
          <Text size='sm' lineClamp={2} weight={500}>
            Login
          </Text>
        </Box>

        {theme.dir === 'ltr' ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </Group>
    </UnstyledButton>
  );
};

const Login = () => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <AnimatePresence exitBeforeEnter initial={false}>
        <Content />
      </AnimatePresence>
    </Box>
  );
};

export default Login;

{
  /* Signed in as {JSON.stringify(session)} <br />
        <button onClick={() => signOut()}>Sign out</button> */
}
