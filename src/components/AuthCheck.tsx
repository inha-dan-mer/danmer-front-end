import { URL_VALUE } from '@/utils/constants';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const nagivate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) nagivate(URL_VALUE.signIn);
  }, []);

  return <>{children}</>;
};

export default AuthCheck;
