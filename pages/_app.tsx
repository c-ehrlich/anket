import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Login from '../components/Login';
import AppHeader from '../components/AppHeader';
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavbar from '../components/AppNavbar';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint='sm'
          asideOffsetBreakpoint='sm'
          fixed
          navbar={
            <Navbar
              p='md'
              hiddenBreakpoint='sm'
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Navbar.Section grow mt='xs'>
                <AppNavbar />
              </Navbar.Section>
              <Navbar.Section>
                <Login />
              </Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={70} p='md'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size='sm'
                    color={theme.colors.gray[6]}
                    mr='xl'
                  />
                </MediaQuery>

                <AppHeader />
              </div>
            </Header>
          }
        >
          <Component {...pageProps} />
        </AppShell>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
