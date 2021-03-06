import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Group,
  Paper,
  Radio,
  RadioGroup,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AlertCircle, Eye, EyeOff } from 'tabler-icons-react';
import useEditSurvey from '../hooks/useEditSurvey';
import useGetSingleSurvey from '../hooks/useGetSingleSurvey';

type Props = {
  surveyId: string;
};

const PreviewSurvey = (props: Props) => {
  const router = useRouter();
  const survey = useGetSingleSurvey(props.surveyId);
  const editSurveyMutation = useEditSurvey({ surveyId: props.surveyId });
  const xs = useMediaQuery('(max-width: 576px)');

  return survey.isLoading ? (
    <div>Loading...</div>
  ) : survey.isError ? (
    <div>Error...</div>
  ) : !survey.isFetched ? (
    <div>Not yet fetched...</div>
  ) : (
    <Stack style={{ marginBottom: '64px' }}>
      <Alert icon={<AlertCircle size={16} />} title='Final Check!'>
        Please review your survey before publishing it. <br />
        (Don&apos;t worry, you can always make changes to your survey even after
        it has been published)
      </Alert>

      <div style={{ maxHeight: '300px' }}>
        {/* TODO: in production, use Next Image and fix the hosts issue by using something
         * like Cloudinary fetch: https://cloudinary.com/documentation/fetch_remote_images
         */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={survey.data.picture}
          alt={`Survey Header Image: ${survey.data.name}`}
          style={{
            width: '100%',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>
      <Title order={2}>{survey.data.name}</Title>
      {survey.data.description !== '' && (
        <Text style={{ whiteSpace: 'pre-line' }}>
          {survey.data.description}
        </Text>
      )}
      <div>
        {survey.data.isPublic ? (
          <Badge
            size='lg'
            variant='filled'
            leftSection={
              <Eye size={22} style={{ position: 'relative', top: '4px' }} />
            }
          >
            Public
          </Badge>
        ) : (
          <Badge
            size='lg'
            variant='outline'
            leftSection={
              <EyeOff size={22} style={{ position: 'relative', top: '4px' }} />
            }
          >
            Private
          </Badge>
        )}
      </div>

      {survey.data.questions.map((question, index) => (
        <Paper key={question.id} shadow='lg' radius='md' p='md' withBorder>
          <Stack>
            <Group
              align='center'
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <div>
                {question.isRequired ? (
                  <Badge variant='filled'>Required</Badge>
                ) : (
                  <Badge variant='outline'>Optional</Badge>
                )}
              </div>
              <Text size='xs'>Question {index + 1}</Text>
            </Group>
            <Title order={3}>{question.question}</Title>
            {question.details !== '' && <Text>{question.details}</Text>}
            {question.questionType === 'multipleChoiceMultiple' ? (
              <Stack>
                {question.multipleChoiceOptions.map((option) => (
                  <Checkbox key={option.id} label={option.name} />
                ))}
              </Stack>
            ) : question.questionType === 'multipleChoiceSingle' ? (
              <RadioGroup orientation='vertical'>
                {question.multipleChoiceOptions.map((option) => (
                  <Radio
                    key={option.id}
                    value={option.name}
                    label={option.name}
                  />
                ))}
              </RadioGroup>
            ) : question.questionType === 'textResponse' ? (
              <Textarea placeholder='Type your response here' />
            ) : question.questionType === 'yesNoBoolean' ? (
              <RadioGroup orientation='vertical'>
                <Radio value='yes' label='Yes' />
                <Radio value='no' label='No' />
              </RadioGroup>
            ) : question.questionType === 'zeroToTen' ? (
              <SegmentedControl
                fullWidth
                defaultValue='-1'
                orientation={xs ? 'vertical' : 'horizontal'}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              />
            ) : (
              <Text>Invalid question type</Text>
            )}
          </Stack>
        </Paper>
      ))}
      <Group grow={true}>
        <div>
          <Link passHref href={`/survey/edit/${survey.data.id}`}>
            <Button style={{ width: '100%' }} variant='outline'>
              Edit
            </Button>
          </Link>
        </div>
        <Button
          onClick={() => {
            editSurveyMutation.mutate({ isCompleted: true });
            router.push(`/survey/created/${survey.data.id}`);
          }}
        >
          Submit
        </Button>
      </Group>
    </Stack>
  );
};

export default PreviewSurvey;
