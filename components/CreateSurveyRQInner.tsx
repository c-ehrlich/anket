import { Input, Stack, Title } from '@mantine/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CreateDefaultSurveyResponse } from '../api/survey/survey.schema';

interface Props {
  survey: CreateDefaultSurveyResponse;
}

const CreateSurveyRQInner = (props: Props) => {
  console.log(props.survey.id)

  const queryClient = useQueryClient();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const editSurveyCoreData = useMutation(
    (editedSurvey: Partial<CreateDefaultSurveyResponse>) => {
      return axios.patch(`/api/survey/${props.survey.id}`, editedSurvey);
    },
    {
      onMutate: (newSurvey) => {
        const tempSurvey = {
          ...props.survey,
          ...newSurvey,
        };
        queryClient.setQueryData<CreateDefaultSurveyResponse>(
          ['create-survey'],
          () => {
            return tempSurvey;
          }
        );
      },
      // FIXME: type this
      onError: (error: any) => window.alert(JSON.stringify(error.response)),
    }
  );

  const handleEditSurveyCoreData = ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    setName(name);
    setDescription(description);
    editSurveyCoreData.mutate({ name, description });
  };

  return (
    <Stack>
      <Title order={2}>Creating survey</Title>
      <Input
        placeholder='Survey name'
        value={name}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          handleEditSurveyCoreData({ name: e.currentTarget.value, description })
        }
      />
      <Input
        placeholder='Survey description'
        value={description}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          handleEditSurveyCoreData({ name, description: e.currentTarget.value })
        }
      />
    </Stack>
  );
};

export default CreateSurveyRQInner;
