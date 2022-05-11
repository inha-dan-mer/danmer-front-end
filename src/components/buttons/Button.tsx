import React from 'react';
import styled from '@emotion/styled';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = ({ children, ...restProps }: Props) => {
  return <ButtonContainer {...restProps}>{children}</ButtonContainer>;
};

const ButtonContainer = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px 20px;
  border-radius: 800px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;

  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
  &:active {
    filter: brightness(80%);
  }
`;

export default Button;
