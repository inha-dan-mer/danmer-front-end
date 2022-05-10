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
  background-color: ${({ theme }) => theme.colors.primary};
  height: 60px;
  align-items: center;
`;
const Logo = styled(Link)`
  font-size: 1.9rem;
  font-weight: 700;
  text-decoration: none;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.background};
`;

export default Header;
