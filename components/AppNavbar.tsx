import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { FilePlus, Home, ListCheck, UserCheck } from 'tabler-icons-react';
import { createSurvey } from '../hooks/useCreateSurvey';

const data: NavBarLinkProps[] = [
  {
    label: 'Home',
    color: 'green',
    onClick: '/',
    icon: <Home size={16} />,
  },
  {
    label: 'Create Survey',
    color: 'green',
    onClick: 'FUNC createSurvey',
    icon: <FilePlus size={16} />,
  },
  {
    label: 'All Surveys',
    color: 'green',
    onClick: '/survey/all',
    icon: <ListCheck size={16} />,
  },
  {
    label: 'My Surveys',
    color: 'green',
    onClick: '/survey/mine',
    icon: <UserCheck size={16} />,
  },
];

interface AppNavbarLinkProps {
  link: NavBarLinkProps;
  closeNavbar: () => void;
}

export const AppNavbarLink = (props: AppNavbarLinkProps) => {
  const router = useRouter();
  const onLinkClick = () => {
    props.closeNavbar();
    if (props.link.onClick === 'FUNC createSurvey') {
      createSurvey().then((survey) => router.push(`/survey/edit/${survey.id}`));
    } else {
      router.push(props.link.onClick);
    }
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
  onClick: string;
}

export default AppNavbar;
