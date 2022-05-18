import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import Button from '@/components/buttons/Button';
import TextInput from '@/components/inputs/TextInput';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onClick'> {
  children?: React.ReactNode;
}

const FileInput = ({ children = '파일 선택', onChange, ...fileProps }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files?.length) {
      setFileName(e.target.files[0].name || '');
    }
    onChange && onChange(e);
  };

  return (
    <Container>
      <File ref={fileRef} type="file" {...fileProps} onChange={handleChange} />
      <Button onClick={() => fileRef.current?.click()}>{children}</Button>
      <TextInput type="text" disabled value={fileName} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;
const File = styled.input`
  display: none;
`;

export default FileInput;
