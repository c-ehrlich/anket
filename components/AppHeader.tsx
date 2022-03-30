import { ActionIcon, Box, Group, Title, useMantineColorScheme } from '@mantine/core'
import { Sun, MoonStars } from 'tabler-icons-react';

const AppHeader = () => {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group sx={{ width: '100%' }} position="apart">
      <Title order={1}>Anket</Title>
      <ActionIcon variant='default' size='xl' ><Sun size={24} /></ActionIcon>
        {/* <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <Sun size={24} /> : <MoonStars size={24} />}
        </ActionIcon> */}
      </Group>
  )
}

export default AppHeader