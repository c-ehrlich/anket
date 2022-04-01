import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Login from '../components/Login';
import ThemeSwitcher from '../components/ThemeSwitcher';
import {
  AppShell,
  Burger,
  ColorScheme,
  ColorSchemeProvider,
  Group,
  Header,
  Image,
  MantineProvider,
  MediaQuery,
  Navbar,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavbar from '../components/AppNavbar';
import ContentMaxWidth from '../components/ContentMaxWidth';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const queryClient = new QueryClient();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider theme={{ colorScheme }}>
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
                  <Group
                    align='center'
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                      <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size='sm'
                        mr='xl'
                      />
                    </MediaQuery>
                    <Image
                      src={colorScheme === 'dark' ? '/logo/logo-v01.png' : '/logo/logo-v01-black.png'}
                      height='32px'
                      alt='Anket Logo'
                    />
                    <ThemeSwitcher />
                  </Group>
                </Header>
              }
            >
              <ContentMaxWidth>
                <Component {...pageProps} />
              </ContentMaxWidth>
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
