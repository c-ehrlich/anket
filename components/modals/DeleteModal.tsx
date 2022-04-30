import { Button, Group, Modal, Stack, Text } from '@mantine/core';

interface Props {
  opened: boolean;
  onClose: () => void;
  title: string;
  text: string;
  onClickDelete: () => void;
}

const DeleteModal = (props: Props) => {
  return (
    <Modal
      centered
      opened={props.opened}
      onClose={props.onClose}
      title={props.title}
    >
      <Stack>
        <Text>{props.text}</Text>
        <Group grow>
          <Button variant='outline' onClick={props.onClose}>Cancel</Button>
          <Button color='red' onClick={props.onClickDelete}>Delete</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteModal;
