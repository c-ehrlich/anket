import {
  Group,
  Stack,
  Title,
  Text,
  Button,
  Center,
  Paper,
  Box,
} from '@mantine/core';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';
import styles from './_styles/LandingPage.module.css';

const features = [
  {
    title: 'Create surveys quickly',
    content:
      'Our efficient survey editor and prebuilt question types make it faster than ever to create survey',
    url: '/img/landing/irasutoya_computer1.png',
    altText: '1',
  },
  {
    title: 'High completion rate',
    content: 'Easy to understand and fun UI means fewer users quit mid-survey',
    url: '/img/landing/irasutoya_qa1.png',
    altText: '2',
  },
  {
    title: 'Analyze your responses',
    content:
      'Use easy to understand graphs and statistics to optimize your business decisions',
    url: '/img/landing/irasutoya_chart1.png',
    altText: '3',
  },
];

const LandingPage = () => {
  const { width, height } = useViewportSize();
  const sm = useMediaQuery('(max-width: 719px)');

  return (
    <Stack>
      <Group position='apart' className={styles.headerWrapper}>
        <Image
          src='/logo/logo-v01-black.png'
          alt='anket-logo'
          height='32px'
          width='100%'
        />
        <Group>
          <div onClick={() => signIn()} className={styles.loginButton}>
            Sign in
          </div>
          <Button onClick={() => signIn()}>Get started</Button>
        </Group>
      </Group>
      <Center>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Title order={1} className={styles.heroHeader}>
              Get to know your customers!
            </Title>
            <Text className={styles.heroText}>
              One platform to create surveys and analyze results to find out how
              to make your company the best it can be.
            </Text>
            <ul className={styles.heroList}>
              <li>Simple to use</li>
              <li>Minimal admin required</li>
              <li>Clear results</li>
            </ul>
            <Button
              className={styles.heroButton}
              size='xl'
              onClick={() => signIn()}
            >
              Get started (free)
            </Button>
            <Box className={styles.heroImage}>
              <Image
                src='/img/landing/irasutoya_table1.png'
                alt='landing-image-1'
                width='100%'
                height='100%'
                layout='responsive'
              />
            </Box>
          </div>
        </div>
      </Center>
      <Stack>
        <Center>
          <div className={styles.container}>
            <Group
              className={styles.cardGroup}
              spacing={32}
              style={{ margin: '16px' }}
              align='stretch'
              noWrap
              grow={true}
              direction={sm ? 'column' : 'row'}
            >
              {features.map((feature, index) => (
                <Paper
                  key={`feature-${index}`}
                  shadow='md'
                  withBorder
                  p='xl'
                  radius='sm'
                >
                  <Stack className={styles.card}>
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={feature.url}
                        alt={feature.altText}
                        height='100%'
                        width='100%'
                        layout='responsive'
                      />
                    </div>
                    <Title order={3} align='center'>
                      {feature.title}
                    </Title>
                    <Text align='center' component='span'>
                      {feature.content}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </Group>
          </div>
        </Center>
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
            <Title className={styles.comparisonHeader} order={2}>
              SurveyMonkey is broken. We fixed it.
            </Title>
            <Text className={styles.comparisonText}>
              {`Everything you need, nothing you don't need - create surveys,
            increase your response rates, analyze response data, and learn how
            to improve your business.`}
            </Text>
            <Center>
              <Button size='lg' onClick={() => signIn()}>
                Get started
              </Button>
            </Center>
          </Stack>
        </Group>
        <Center className={styles.lastCtaBg}>
          <div className={styles.container}>
            <Group grow={true}>
              <Stack align='center'>
                <Title order={1} className={styles.lastCta}>
                  Create your first survey now
                </Title>
                <Button size='xl' onClick={() => signIn()}>
                  Let&apos;s do this
                </Button>
              </Stack>
              <Box>
                <Image
                  src='/img/landing/irasutoya_genki1.png'
                  alt='genki'
                  width='100%'
                  height='100%'
                  layout='responsive'
                />
              </Box>
            </Group>
          </div>
        </Center>
        <Stack>
          <div className={styles.footerText}>
            Anket - Copyright {new Date().getFullYear()}
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LandingPage;
