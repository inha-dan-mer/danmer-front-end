import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { ResAuthUser } from '@/api/types';
import { URL_VALUE } from '@/utils/constants';

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<ResAuthUser>();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    navigate(URL_VALUE.signIn);
  };

  const handleMyVideos = () => {
    navigate(URL_VALUE.me);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate(URL_VALUE.signIn);
    } else {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <Container>
      <Logo to="/">DANMER</Logo>
      <Right>
        {user ? (
          <>
            <TextButton onClick={handleLogout}>로그아웃</TextButton>
            <TextButton onClick={handleMyVideos}>나의 영상 보기</TextButton>
          </>
        ) : (
          <TextButton onClick={() => navigate(URL_VALUE.signIn)}>로그인</TextButton>
        )}
      </Right>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: space-between;
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
const Right = styled.div`
  display: flex;
  gap: 10px;
`;
const TextButton = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  color: #2e2e2e;
  padding: 0 10px;
`;

export default Header;
