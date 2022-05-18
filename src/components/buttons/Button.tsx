import styled from '@emotion/styled';

const Button = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px 20px;
  border-radius: 800px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #9cf0e3;
  }
  &:active {
    background-color: rgba(47, 244, 214, 0.8);
  }
`;

export default Button;
