import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import VideoContents from './VideoContents';

const PracticeDancing = () => {
  const params = useParams();
  console.log(params?.videoId);

  return (
    <Container>
      <Title>짱구는 못말려</Title>
      <SubTitle>뚜둔</SubTitle>
      <VideoContents />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;
const Title = styled.h1`
  padding: 20px;
  padding-bottom: 0;
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;
const SubTitle = styled.h2`
  padding: 10px 0 20px 20px;
  font-size: 1.2rem;
  color: lightgray;
`;

export default PracticeDancing;
