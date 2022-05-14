import { Group, Stack, Title, Text, Button, SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import React, { useState } from 'react';

const features = [
  {
    url: '/img/landing/irasutoya_chart1.png',
    altText: '0',
  },
  {
    url: '/1',
    altText: '1',
  },
  {
    url: '/2',
    altText: '2',
  },
  {
    url: '/3',
    altText: '3',
  },
  {
    url: '/4',
    altText: '4',
  },
];

type Props = {};

const LandingPage = (props: Props) => {
  const { height } = useViewportSize();
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  return (
    <Stack>
      <Group position='apart'>
        <Image
          src='/logo/logo-v01-black.png'
          alt='anket-logo'
          height='32px'
          width='100%'
        />
        <Group>
          <Button>Sign in</Button>
          <Button>Get started</Button>
        </Group>
      </Group>
      <Group grow={true} style={{ minHeight: height }}>
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
          <Button>Get started (free)</Button>
        </Stack>
        <Image
          src='/img/landing/irasutoya_table1.png'
          alt='landing-image-1'
          width='100%'
          height='100%'
        />
      </Group>
      <Group grow={true}>
        <SimpleGrid cols={2}>
          <div style={{ borderRadius: '16px', border: '1px solid grey' }}>
            <Title order={3}>Create surveys quickly</Title>
            <Text>
              Our efficient survey editor and prebuilt question types make it
              faster than ever to create survey
            </Text>
          </div>
          <div style={{ borderRadius: '16px', border: '1px solid grey' }}>
            <Title order={3}>High completion rate</Title>
            <Text>
            Easy to understand and fun UI means fewer users quit mid-survey
            </Text>
          </div>
          <div style={{ borderRadius: '16px', border: '1px solid grey' }}>
            <Title order={3}>Analyze your responses</Title>
            <Text>
            Make the most of your survey response data with easy to understand graphs and statistics
            </Text>
          </div>
          <div style={{ borderRadius: '16px', border: '1px solid grey' }}>
            <Title order={3}>Make better decisions</Title>
            <Text>
            Use the results to optimize your business decisions
            </Text>
          </div>
        </SimpleGrid>
        <Image
          src={features[selectedFeature].url}
          alt={features[selectedFeature].altText}
          width='100%'
          height='100%'
        />
      </Group>
      <Group grow={true}>
        <Image
          src='/img/landing/irasutoya_race1.png'
          alt='race1'
          width='100%'
          height='100%'
        />
        <Stack>
          <Title order={2}>SurveyMonkey is broken. We fixed it.</Title>
          <Text>
            {`Everything you need, nothing you don't need - create surveys,
            increase your response rates, analyze response data, and learn how
            to improve your business.`}
          </Text>
          <Group>
            <Button>{`->`}</Button>
            <Button>Get started</Button>
          </Group>
        </Stack>
      </Group>
      <Group>
        <Stack>
          <Title order={1}>Create your first survey now</Title>
          <Button>Get started (free)</Button>
        </Stack>
        <div>todo add image</div>
      </Group>
      <div>Get started. Its free (huge link)</div>
      <div>actual footer</div>
    </Stack>
  );
};

export default LandingPage;
