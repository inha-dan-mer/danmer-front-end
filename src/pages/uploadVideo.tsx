import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const UploadVideoPage = () => {
  const { search } = useLocation();
  console.log(search);

  return <Container></Container>;
};

export default UploadVideoPage;

const Container = styled.div`
  height: 100%;

  & > * {
    max-width: 1060px;
    margin: auto;
  }
`;
