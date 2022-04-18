import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { AddressBook, Backpack, Icon } from 'tabler-icons-react';

const data: NavBarLinkProps[] = [
  {
    label: 'Home',
    color: 'green',
    url: '/',
    icon: <AddressBook size={16} />,
  },
  {
    label: 'Test Requests',
    url: '/testRequests',
    icon: <Backpack size={16} />,
  },
  {
    label: 'Create Survey',
    url: '/survey/create',
    icon: <Backpack size={16} />
  },
  {
    label: 'All Surveys',
    url: '/survey/all',
    icon: <Backpack size={16} />,
  },
  {
    label: 'My Surveys',
    url: '/survey/mine',
    icon: <Backpack size={16} />,
  }
];

const AppNavbarLink = (props: NavBarLinkProps) => {
  return (
    <Link href={props.url} passHref>
      <UnstyledButton
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
    </Link>
  );
};

const AppNavbar = () => {
  const links = data.map((link) => (
    <AppNavbarLink {...link} key={link.label} />
  ));

  return <div>{links}</div>;
};

interface NavBarLinkProps {
  icon: ReactNode;
  color?: string;
  label: string;
  url: string;
}

export default AppNavbar;
