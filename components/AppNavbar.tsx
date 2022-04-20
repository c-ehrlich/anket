import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    icon: <Backpack size={16} />,
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
  },
];

interface AppNavbarLinkProps {
  link: NavBarLinkProps;
  closeNavbar: () => void;
}

export const AppNavbarLink = (props: AppNavbarLinkProps) => {
  const router = useRouter();
  const onLinkClick = () => {
    console.log('click');
    props.closeNavbar();
    router.push(props.link.url);
  };
  return (
    <UnstyledButton
      onClick={onLinkClick}
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
        <ThemeIcon color={props.link.color} variant='light'>
          {props.link.icon}
        </ThemeIcon>

        <Text size='sm'>{props.link.label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const AppNavbar = ({ closeNavbar }: { closeNavbar: () => void }) => {
  const links = data.map((link) => (
    <AppNavbarLink link={link} closeNavbar={closeNavbar} key={link.label} />
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
