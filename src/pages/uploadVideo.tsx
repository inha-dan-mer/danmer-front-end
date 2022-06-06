import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { uploadDancingVideoFile } from '@/api/main.api';

import TextInput from '@/components/inputs/TextInput';
import FileInput from '@/components/inputs/FileInput';
import Button from '@/components/buttons/Button';

interface FormValues {
  title: string;
  artistName: string;
  videoFile: File;
  thumbnailFile: File;
  singer: string;
}

const UploadVideoPage = () => {
  const { control, handleSubmit, setValue } = useForm<FormValues>();
  const navigate = useNavigate();

  const handleUploadFile = (input: FormValues) => {
    uploadDancingVideoFile({
      video_title: input.title,
      video_url: input.videoFile,
      thumbnail_url: input.thumbnailFile,
      song_artist: input.singer,
    }).then(() => {
      navigate('/');
    });
  };

  const handleFileSelect = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    name: 'videoFile' | 'thumbnailFile'
  ) => {
    if (!target.files?.length) return;
    const file = target.files[0];
    setValue(name, file);
  };

  return (
    <Container>
      <Contents>
        <Card>
          <Label>원곡 제목</Label>
          <Controller
            name="title"
            control={control}
            rules={{ required: '제목을 입력해주세요' }}
            render={({ field }) => <TextInput type="text" placeholder="원곡 제목" {...field} />}
          />
        </Card>
        <Card>
          <Label>원곡 아티스트</Label>
          <Controller
            name="singer"
            control={control}
            rules={{ required: '아티스트 이름을 입력해주세요' }}
            render={({ field }) => <TextInput type="text" placeholder="원곡 아티스트" {...field} />}
          />
        </Card>
        <Card>
          <Label>영상</Label>
          <Controller
            name="videoFile"
            control={control}
            rules={{ required: '등록할 영상을 선택해주세요' }}
            render={({ field: { name } }) => (
              <FileInput
                name={name}
                accept="video/mp4"
                multiple={false}
                onChange={(e) => handleFileSelect(e, name)}
              />
            )}
          />
        </Card>
        <Card>
          <Label>영상 썸네일</Label>
          <Controller
            name="thumbnailFile"
            control={control}
            rules={{ required: '썸네일 이미지를 선택해주세요' }}
            render={({ field: { name } }) => (
              <FileInput
                name={name}
                accept="image/*"
                multiple={false}
                onChange={(e) => handleFileSelect(e, name)}
              />
            )}
          />
        </Card>
      </Contents>
      <ButtonWrapper>
        <Button onClick={handleSubmit(handleUploadFile)} style={{ width: 300 }}>
          업로드하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default UploadVideoPage;

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
  width: 200px;
  color: white;
  text-align: end;
  font-size: 0.9rem;
`;
const ButtonWrapper = styled.div`
  margin-top: 30px;
`;
