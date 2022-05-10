import React from 'react';
import styled from '@emotion/styled';

import VideoList from '@/components/VideoList';

const MainPage = () => {
  return (
    <MainContainer>
      <main style={{ paddingTop: 30, paddingBottom: 30 }}>
        <VideoList />
      </main>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  height: 100%;

  & > * {
    max-width: 1060px;
    margin: auto;
  }
`;
