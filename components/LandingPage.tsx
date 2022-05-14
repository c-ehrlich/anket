import {
  Group,
  Stack,
  Title,
  Text,
  Button,
  SimpleGrid,
  Center,
  Paper,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { ArrowBigRight, ArrowRightCircle } from 'tabler-icons-react';

const features = [
  {
    url: '/img/landing/irasutoya_computer1.png',
    altText: '0',
  },
  {
    url: '/img/landing/irasutoya_computer1.png',
    altText: '1',
  },
  {
    url: '/img/landing/irasutoya_qa1.png',
    altText: '2',
  },
  {
    url: '/img/landing/irasutoya_chart1.png',
    altText: '3',
  },
  {
    url: '/img/landing/irasutoya_cash1.png',
    altText: '4',
  },
];

const LandingPage = () => {
  const { width, height } = useViewportSize();
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  return (
    <Center>
      <Stack style={{ margin: '16px' }} spacing={64}>
        <Group position='apart'>
          <Image
            src='/logo/logo-v01-black.png'
            alt='anket-logo'
            height='32px'
            width='100%'
          />
          <Group>
            <Button onClick={() => signIn()}>Sign in</Button>
            <Button onClick={() => signIn()}>Get started</Button>
          </Group>
        </Group>
        <Group grow={true}>
          <Stack>
            <Title order={1}>Get to know your customers!</Title>
            <Text>
              One platform to create surveys and analyze results to find out how
              to make your company the best it can be.
            </Text>
            <ul>
              <li>Simple to use</li>
              <li>Minimal admin required</li>
              <li>Clear results</li>
            </ul>
            <Button onClick={() => signIn()}>Get started (free)</Button>
          </Stack>
          <Paper>
            <Image
              src='/img/landing/irasutoya_table1.png'
              alt='landing-image-1'
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Paper>
        </Group>
        <Group grow={true}>
          <SimpleGrid cols={2}>
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid grey',
                padding: '16px',
              }}
              onMouseEnter={() => setSelectedFeature(1)}
              onClick={() => setSelectedFeature(1)}
            >
              <Title order={3}>Create surveys quickly</Title>
              <Text>
                Our efficient survey editor and prebuilt question types make it
                faster than ever to create survey
              </Text>
            </div>
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid grey',
                padding: '16px',
              }}
              onMouseEnter={() => setSelectedFeature(2)}
              onClick={() => setSelectedFeature(2)}
            >
              <Title order={3}>High completion rate</Title>
              <Text>
                Easy to understand and fun UI means fewer users quit mid-survey
              </Text>
            </div>
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid grey',
                padding: '16px',
              }}
              onMouseEnter={() => setSelectedFeature(3)}
              onClick={() => setSelectedFeature(3)}
            >
              <Title order={3}>Analyze your responses</Title>
              <Text>
                Make the most of your survey response data with easy to
                understand graphs and statistics
              </Text>
            </div>
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid grey',
                padding: '16px',
              }}
              onMouseEnter={() => setSelectedFeature(4)}
              onClick={() => setSelectedFeature(4)}
            >
              <Title order={3}>Make better decisions</Title>
              <Text>Use the results to optimize your business decisions</Text>
            </div>
          </SimpleGrid>
          <Paper>
            <Image
              src={features[selectedFeature].url}
              alt={features[selectedFeature].altText}
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Paper>
        </Group>
        <Group grow={true}>
          <Paper>
            <Image
              src='/img/landing/irasutoya_board1.png'
              alt='race1'
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Paper>
          <Stack>
            <Title order={2}>SurveyMonkey is broken. We fixed it.</Title>
            <Text>
              {`Everything you need, nothing you don't need - create surveys,
            increase your response rates, analyze response data, and learn how
            to improve your business.`}
            </Text>
            <Group>
              <Button onClick={() => signIn()}>
                <Group spacing={8}>
                  <ArrowBigRight />
                  <span>Get started</span>
                </Group>
              </Button>
            </Group>
          </Stack>
        </Group>
        <Group grow={true}>
          <Stack>
            <Title order={1}>Create your first survey now</Title>
            <Button onClick={() => signIn()}>Get started (free)</Button>
          </Stack>
          <Paper>
            <Image
              src='/img/landing/irasutoya_genki1.png'
              alt='genki'
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Paper>
        </Group>
        <Stack>
          <hr style={{ width: '100%' }} />
          <Center>Anket - Copyright {new Date().getFullYear()}</Center>
        </Stack>
      </Stack>
    </Center>
  );
};

export default LandingPage;
