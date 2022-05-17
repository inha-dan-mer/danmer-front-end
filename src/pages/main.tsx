import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import VideoList from '@/components/VideoList';
import Button from '@/components/buttons/Button';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <MainHeader>
        <Button onClick={() => navigate('/video/upload?type=dancing')}>안무 영상 업로드</Button>
      </MainHeader>
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
const MainHeader = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;
