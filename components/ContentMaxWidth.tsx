import { Container } from '@mantine/core'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const ContentMaxWidth = (props: Props) => {
  return (
    <Container size='md'>{props.children}</Container>
  )
}

export default ContentMaxWidth