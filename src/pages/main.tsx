import React from 'react';
import styled from '@emotion/styled';

import Button from '@/components/buttons/Button';

const MainPage = () => {
  return (
    <>
      main page
      <Button onClick={() => console.log('hihi')}>영상 업로드</Button>
    </>
  );
};

export default MainPage;

const MainContainer = styled.div`
  ${({ theme }) => theme.colors.primary}
`;
