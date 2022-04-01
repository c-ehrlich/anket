import {
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
      <ActionIcon
        variant='default'
        onClick={() => toggleColorScheme()}
        size={30}
      >
        {colorScheme === 'dark' ? <Sun size={24} /> : <MoonStars size={24} />}
      </ActionIcon>
  );
};

export default ThemeSwitcher;
