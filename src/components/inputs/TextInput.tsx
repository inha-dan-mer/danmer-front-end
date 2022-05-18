import styled from '@emotion/styled';

const TextInput = styled.input`
  outline: none;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 2px solid ${({ theme }) => theme.colors.inputOutline};
  color: white;
  font-size: 1rem;
  border-radius: 2px;
  transition: border 0.8s, box-shadow 0.4s;

  &:hover {
    border: 2px solid rgba(47, 244, 214, 0.8);
  }
  &:focus {
    box-shadow: 0px 0px 8px 3px rgba(47, 244, 214, 0.44);
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
  &:disabled {
    border: 2px solid gray;
  }
`;

export default TextInput;
