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
  padding: 1rem 1.2rem;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default Button;
