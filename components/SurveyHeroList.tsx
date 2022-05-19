import { Alert, Input, Stack } from '@mantine/core';
import React, { useDeferredValue, useMemo, useState } from 'react';
import { AlertCircle, Search, X } from 'tabler-icons-react';
import { SurveyPreviewWithAuthorAndInteraction } from '../api/survey/survey.schema';
import SurveyHero from './SurveyHero';

interface Props {
  surveys: SurveyPreviewWithAuthorAndInteraction[];
}

const SurveyHeroList = (props: Props) => {
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredSurveysFn = useDeferredValue(
    ({
      surveys,
      query,
    }: {
      surveys: SurveyPreviewWithAuthorAndInteraction[];
      query: string;
    }) => {
      return surveys.filter((survey) => {
        return survey.name.toLowerCase().includes(query.toLowerCase()) ||
          survey.description.toLowerCase().includes(query.toLowerCase())
          ? true
          : false;
      });
    }
  );

  const filteredSurveys = useMemo(
    () => filteredSurveysFn({ surveys: props.surveys, query: filterQuery }),
    [filteredSurveysFn, props.surveys, filterQuery]
  );

  if (props.surveys.length === 0) {
    return <div>No surveys found</div>;
  }

  return (
    <Stack>
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

      {filteredSurveys.length > 0 ? (
        filteredSurveys.map((survey) => (
          <SurveyHero survey={survey} key={survey.id} />
        ))
      ) : (
        <Alert
          icon={<AlertCircle size={16} />}
          title='Nothing found'
          color='yellow'
        >
          Looks like there are no surveys that match your search terms. Please
          try a less specific search.
        </Alert>
      )}
    </Stack>
  );
};

export default SurveyHeroList;
