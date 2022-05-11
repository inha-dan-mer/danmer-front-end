import React from 'react';
import styled from '@emotion/styled';

import VideoList from '@/components/VideoList';
import Button from '@/components/buttons/Button';
import { useLocation } from 'react-router-dom';

const UploadVideoPage = () => {
  const { search } = useLocation();
  console.log(search.replace('?', ''));

  return <Container>upload video</Container>;
};

export default UploadVideoPage;

const Container = styled.div`
  height: 100%;

  & > * {
    max-width: 1060px;
    margin: auto;
  }
`;
