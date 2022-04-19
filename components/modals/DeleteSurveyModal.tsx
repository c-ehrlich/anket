import { Button, Group, Modal, Stack, Text } from '@mantine/core';

interface Props {
  opened: boolean;
  onClose: () => void;
  title: string;
  onClickDelete: () => void;
}

const DeleteSurveyModal = (props: Props) => {
  return (
    <Modal
      centered
      opened={props.opened}
      onClose={props.onClose}
      title={props.title}
    >
      <Stack>
        <Text>Are you sure? Your unsaved survey will be deleted.</Text>
        <Group grow>
          <Button variant='outline' onClick={props.onClose}>Cancel</Button>
          <Button color='red' onClick={props.onClickDelete}>Delete</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteSurveyModal;
