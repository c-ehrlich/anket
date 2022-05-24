import {
  Avatar,
  Box,
  Group,
  MediaQuery,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ReactNode, useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Logout,
  Settings,
} from 'tabler-icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Content = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const theme = useMantineTheme();
  const [onLogoutPage, setOnLogoutPage] = useState<boolean>(false);

  const logoutAndResetState = async () => {
    await router.push('/');
    signOut();
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
            <Stack>
              <LoginLink
                icon={<Logout />}
                label='Logout'
                onClick={logoutAndResetState}
              />
              <LoginLink
                icon={<Settings />}
                label='Settings'
                onClick={() => router.push('/user/settings')}
              />
              <LoginLink
                icon={<ChevronLeft />}
                label='Back'
                onClick={() => setOnLogoutPage(false)}
              />
            </Stack>
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
                    <Text size='md' lineClamp={2} weight={500}>
                      Account
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
      {/* TODO remove once this gets merged or there is another fix
          https://github.com/framer/motion/pull/1507 
          @ts-expect-error TODO */}
      <AnimatePresence exitBeforeEnter initial={false}>
        <Content />
      </AnimatePresence>
    </Box>
  );
};

export default Login;

interface LoginLinkProps {
  onClick: () => void;
  color?: string;
  label: string;
  icon: ReactNode;
}

const LoginLink = (props: LoginLinkProps) => {
  return (
    <UnstyledButton
      onClick={props.onClick}
      sx={(theme) => ({
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
      })}
    >
      <Group>
        <ThemeIcon color={props.color} variant='light'>
          {props.icon}
        </ThemeIcon>

        <Text size='sm'>{props.label}</Text>
      </Group>
    </UnstyledButton>
  );
};
