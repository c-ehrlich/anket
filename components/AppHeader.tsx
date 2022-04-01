import {
  ActionIcon,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

const AppHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position='apart'>
      <ActionIcon
        variant='default'
        onClick={() => toggleColorScheme()}
        size={30}
      >
        {colorScheme === 'dark' ? <Sun size={24} /> : <MoonStars size={24} />}
      </ActionIcon>
    </Group>
  );
};

export default AppHeader;
