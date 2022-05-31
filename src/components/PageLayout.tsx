import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import Header from '@/components/Header';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      {/* TODO fallback 넣기  */}
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: calc(100vh - 60px);
`;

export default PageLayout;
