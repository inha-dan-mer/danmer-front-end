import React from 'react';
import styled from '@emotion/styled';
import Header from '@/components/Header';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
`;

export default PageLayout;
