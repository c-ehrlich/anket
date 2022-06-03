import { Button, Group, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { createSurveySchema } from '../../backend/survey/survey.schema';
import { createSurveyWithData } from '../../hooks/useCreateSurveyWithData';

const CreateSurveyPage = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      picture: '',
    },
    schema: zodResolver(createSurveySchema),
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack style={{ marginBottom: '64px' }}>
        <Title order={1}>Create Survey</Title>
        <TextInput
          required
          label='Name'
          placeholder='Survey Name'
          {...form.getInputProps('name')}
        />
        <Textarea
          label='Description'
          placeholder='(optional)'
          {...form.getInputProps('description')}
          autosize
          minRows={4}
        />
        <TextInput
          label='Picture'
          placeholder='(url or leave empty)'
          {...form.getInputProps('picture')}
        />
        <Group grow>
          <Button
            variant='outline'
            color='red'
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            onClick={() =>
              createSurveyWithData(form.values).then((survey) =>
                router.push(`/survey/edit/${survey.id}`)
              )
            }
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateSurveyPage;
