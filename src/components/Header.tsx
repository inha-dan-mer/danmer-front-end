import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Container>
      <Logo to="/">DANMER</Logo>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  height: 60px;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.primary};
`;
const Logo = styled(Link)`
  font-size: 1.9rem;
  font-family: Riffic;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.background};
`;

export default Header;
