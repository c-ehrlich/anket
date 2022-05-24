import { Button, Center, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { createSurveySchema } from '../../api/survey/survey.schema';
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
        <TextInput
          label='Description'
          placeholder='(optional)'
          {...form.getInputProps('description')}
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
          <div>{JSON.stringify(form)}</div>
      </Stack>
    </form>
  );
};

export default CreateSurveyPage;
