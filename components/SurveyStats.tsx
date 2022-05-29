import { Box, Button, Divider, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { SurveyStatsResponse } from '../backend/surveyStats/surveyStats.schema';
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SurveyStatsYesNo from './surveyStats/SurveyStatsYesNo';

type PageProps = { survey: SurveyStatsResponse };

function generateDisplayData(survey: SurveyStatsResponse) {
  const displayData: ChartData[] = [];
  survey.questions.forEach((q) => {
    let res: ChartData = [];
    switch (q.questionType) {
      case 'multipleChoiceMultiple':
      case 'multipleChoiceSingle':
        res = [];
        q.multipleChoiceOptions.forEach((option) =>
          res.push({
            name: option.name,
            value: option.multipleChoiceOptionSelections.length,
          })
        );
        if (q.questionType === 'multipleChoiceSingle' && !q.isRequired) {
          res.push({
            name: 'No Answer',
            value:
              survey.participations.length -
              q.multipleChoiceOptions.reduce(
                (acc, cur) => cur.multipleChoiceOptionSelections.length + acc,
                0
              ),
          });
        }
        displayData.push(res);
        break;
      case 'yesNoBoolean':
        res = [
          { name: 'Yes', value: 0 },
          { name: 'No', value: 0 },
        ];
        q.questionResponses.forEach((qr) => {
          if (qr.answerBoolean === true) {
            res = [
              { name: 'Yes', value: res[0].value + 1 },
              { name: 'No', value: res[1].value },
            ];
          }
          if (qr.answerBoolean === false) {
            res = [
              { name: 'Yes', value: res[0].value },
              { name: 'No', value: res[1].value + 1 },
            ];
          }
        });
        if (!q.isRequired) {
          res.push({
            name: 'No Answer',
            value: survey.participations.length - q.questionResponses.length,
          });
        }
        displayData.push(res);
        break;
      case 'zeroToTen':
        res = [...zeroToTenDefault];
        q.questionResponses.forEach((qr) => {
          console.log(res);
          console.log(qr);
          res[Number(qr.answerNumeric)] = {
            ...res[Number(qr.answerNumeric)],
            value: res[Number(qr.answerNumeric)].value + 1,
          };
        });
        if (!q.isRequired) {
          res.push({
            name: 'No Answer',
            value: survey.participations.length - q.questionResponses.length,
          });
        }
        displayData.push(res);
        break;
      case 'textResponse':
        displayData.push([] as ChartData);
        break;
      default:
        console.error(
          'unexpected questionType found during generateDisplayData'
        );
        displayData.push([] as ChartData);
        break;
    }
  });
  return displayData;
}

type ChartData = {
  name: string;
  value: number;
}[];

const SurveyStats = (props: PageProps) => {
  const displayData = generateDisplayData(props.survey);
  const router = useRouter();

  return (
    <Stack>
      <Title order={1}>Stats</Title>
      <Text>
        {props.survey.participations.length} users have responsed to your
        survey.
      </Text>
      <Divider />
      {props.survey.participations.length !== 0 ? (
        <>
          <div style={{ maxHeight: '300px' }}>
            {/* TODO: in production, use Next Image and fix the hosts issue by using something
             * like Cloudinary fetch: https://cloudinary.com/documentation/fetch_remote_images
             */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.survey.picture}
              alt={`Survey Header Image: ${props.survey.name}`}
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </div>
          <Title order={2}>{props.survey.name}</Title>
          <Text style={{ whiteSpace: 'pre-line' }}>
            {props.survey.description}
          </Text>
          {props.survey.questions.map((q, index) => (
            <Paper withBorder p='md' shadow='md' key={q.id}>
              <Stack>
                <Title order={2}>{q.question}</Title>
                {q.details && <Text>{q.details}</Text>}
                {q.questionType === 'multipleChoiceSingle' && (
                  <ResponsiveContainer width='99%' aspect={1} maxHeight={400}>
                    <PieChart data={displayData[index]}>
                      <Pie
                        data={displayData[index]}
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        fill='#69DB7C'
                      />
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {q.questionType === 'multipleChoiceMultiple' && (
                  <ResponsiveContainer width='99%' aspect={3}>
                    <BarChart data={displayData[index]}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <Bar dataKey='value' fill='#69DB7C' />
                      <Tooltip />
                      <YAxis />
                      <XAxis
                        dataKey='name'
                        // dataKey={(x) =>
                        //   x.name.length > 12
                        //     ? x.name.slice(0, 12) + '...'
                        //     : x.name.slice(0, 12)
                        // }
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                {q.questionType === 'yesNoBoolean' && (
                  // <ResponsiveContainer width='99%' aspect={1} maxHeight={400}>
                  //   <PieChart data={displayData[index]}>
                  //     <Pie
                  //       data={displayData[index]}
                  //       dataKey='value'
                  //       nameKey='name'
                  //       cx='50%'
                  //       cy='50%'
                  //       // outerRadius={100}
                  //       fill='#69DB7C'
                  //     />
                  //     <Legend />
                  //     <Tooltip />
                  //   </PieChart>
                  // </ResponsiveContainer>
                  <SurveyStatsYesNo question={q} />
                )}

                {q.questionType === 'zeroToTen' && (
                  <ResponsiveContainer width='99%' aspect={1} maxHeight={400}>
                    <PieChart data={displayData[index]}>
                      <Pie
                        data={displayData[index]}
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        fill='#69DB7C'
                      />
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {q.questionType === 'textResponse' && (
                  <Stack>
                    {q.questionResponses.map((r) => (
                      <Text key={r.id}>{r.answerText}</Text>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Paper>
          ))}
        </>
      ) : (
        <>
          <Text>It looks like nobody has responded to your survey yet.</Text>
          <Text>
            If you want an example of what this page might look like once people
            respond, we have a response demo page.
          </Text>
          <Box>
            <Button onClick={() => router.push('/survey/stats/demo')}>
              Demo
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
};

const zeroToTenDefault: ChartData = [
  {
    name: '0',
    value: 0,
  },
  {
    name: '1',
    value: 0,
  },
  {
    name: '2',
    value: 0,
  },
  {
    name: '3',
    value: 0,
  },
  {
    name: '4',
    value: 0,
  },
  {
    name: '5',
    value: 0,
  },
  {
    name: '6',
    value: 0,
  },
  {
    name: '7',
    value: 0,
  },
  {
    name: '8',
    value: 0,
  },
  {
    name: '9',
    value: 0,
  },
  {
    name: '10',
    value: 0,
  },
];

export default SurveyStats;
