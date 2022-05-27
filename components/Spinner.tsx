import { Center } from '@mantine/core';
import React from 'react';
import { MoonLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <Center>
      <MoonLoader color='green' />
    </Center>
  );
};

export default Spinner;
