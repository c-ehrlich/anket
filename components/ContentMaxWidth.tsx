import { Container } from '@mantine/core';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ContentMaxWidth = (props: Props) => {
  return (
    <Container px={0}>
      <Container size='md'>{props.children}</Container>
    </Container>
  );
};

export default ContentMaxWidth;
