import { Input, Stack, Text, Title } from '@mantine/core';
import React, { useDeferredValue, useState } from 'react';
import { Search, X } from 'tabler-icons-react';
import { SurveyPreviewWithAuthor } from '../../api/survey/survey.schema';
import SurveyHero from '../../components/SurveyHero';
import useGetMySurveys from '../../hooks/useGetMySurveys';

const AllSurveys = () => {
  const { data: surveys, status } = useGetMySurveys();
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredSurveys = useDeferredValue(
    ({
      surveys,
      query,
    }: {
      surveys: SurveyPreviewWithAuthor[];
      query: string;
    }) => {
      return surveys.filter((survey) => {
        return survey.name.toLowerCase().includes(query.toLowerCase()) || survey.description.toLowerCase().includes(query.toLowerCase())
          ? true
          : false;
      });
    }
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>{status}</div>;
  }

  if (!surveys) return <div>No Surveys</div>;

  return (
    <Stack>
      <Title order={2}>My Surveys</Title>
      <Input
        icon={<Search size={16} />}
        placeholder='Filter surveys'
        value={filterQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilterQuery(e.currentTarget.value)
        }
        rightSection={
          filterQuery ? (
            <X
              size={16}
              onClick={() => setFilterQuery('')}
              style={{ display: 'block', opacity: 0.5, cursor: 'pointer' }}
            />
          ) : null
        }
      />
      {surveys &&
        filteredSurveys({ surveys, query: filterQuery }).map((survey) => (
          <SurveyHero survey={survey} key={survey.id} />
        ))}
    </Stack>
  );
};

export default AllSurveys;
