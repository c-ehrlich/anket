import { Container } from '@mantine/core';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ContentMaxWidth = (props: Props) => {
  return (
    <Container px={0} size='md'>
      {props.children}
    </Container>
  );
};

export default ContentMaxWidth;
