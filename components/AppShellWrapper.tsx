import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  useMantineColorScheme,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AppNavbar from './AppNavbar';
import ContentMaxWidth from './ContentMaxWidth';
import Login from './Login';
import ThemeSwitcher from './ThemeSwitcher';

interface Props {
  children: React.ReactNode;
}

const AppShellWrapper = (props: Props) => {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) toggleColorScheme('light');

  // Hide AppShell on pages where we don't want it
  if (['/'].includes(router.pathname) && !session) return <>{props.children}</>;

  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      fixed
      navbar={
        ['/signin'].includes(router.pathname) ? undefined : (
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!navbarIsOpen}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section grow mt='xs'>
              <AppNavbar closeNavbar={() => setNavbarIsOpen(false)} />
            </Navbar.Section>
            <Navbar.Section>
              <Login />
            </Navbar.Section>
          </Navbar>
        )
      }
      header={
        <Header height={70} p='md'>
          <Group align='center' sx={{ justifyContent: 'space-between' }}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={navbarIsOpen}
                onClick={() => setNavbarIsOpen((o) => !o)}
                size='sm'
                mr='xl'
              />
            </MediaQuery>
            <Image
              src={
                colorScheme === 'dark'
                  ? '/logo/logo-v01.png'
                  : '/logo/logo-v01-black.png'
              }
              height='32px'
              width='100%'
              alt='Anket Logo'
            />
            <ThemeSwitcher />
          </Group>
        </Header>
      }
    >
      <ContentMaxWidth>{props.children}</ContentMaxWidth>
    </AppShell>
  );
};

export default AppShellWrapper;
