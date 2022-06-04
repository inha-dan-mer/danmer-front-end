import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { signUp } from '@/api/auth.api';

import { User } from '@/types';
import { URL_VALUE } from '@/utils/constants';

import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<User>();

  const handleSignUp = (input: User) => {
    signUp(input)
      .then(() => {
        // TODO 토스트 메세지
        navigate(URL_VALUE.signIn);
      })
      .catch((e) => console.error(e));
  };

  return (
    <Container>
      <Contents>
        <Card>
          <Label>아이디</Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'ID를 입력해주세요' }}
            render={({ field }) => <TextInput type="text" placeholder="아이디" {...field} />}
          />
        </Card>
        <Card>
          <Label>이메일</Label>
          <Controller
            name="email"
            control={control}
            rules={{ required: '메일을 입력해주세요' }}
            render={({ field }) => (
              <TextInput type="text" placeholder="example@example.com" {...field} />
            )}
          />
        </Card>
        <Card>
          <Label>비밀번호</Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: '비밀번호를 입력해주세요' }}
            render={({ field }) => <TextInput type="password" placeholder="비밀번호" {...field} />}
          />
        </Card>
      </Contents>
      <ButtonWrapper>
        <Button onClick={handleSubmit(handleSignUp)} style={{ width: 300 }}>
          가입하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  & > * {
    max-width: 1060px;
  }
`;
const Contents = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 100px;
`;
const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const Label = styled.div`
  width: 100px;
  color: white;
  text-align: end;
  font-size: 0.9rem;
`;
const ButtonWrapper = styled.div`
  margin-top: 30px;
`;

export default SignUpPage;
