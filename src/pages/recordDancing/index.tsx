import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { DancerVideo } from '@/interfaces/app.interface';
import { getVideoDetail } from '@/api/main.api';

import VideoContents from './VideoContents';
import Modal from '@/components/Modal';

const RecordDancing = () => {
  const params = useParams();
  const [videoDetail, setVideoDetail] = useState<DancerVideo>();
  const [checkModalVisible, setCheckModalVisible] = useState(true);

  useEffect(() => {
    const { videoId } = params;
    if (!videoId) return;

    getVideoDetail(+videoId).then((res) => setVideoDetail(res));
  }, [params?.videoId]);

  return (
    <Container>
      {videoDetail && (
        <>
          <Title>
            {videoDetail.videoInfo.title} - {videoDetail.videoInfo.artist}
          </Title>
          <SubTitle>{videoDetail.dancer.name || '안무가'}</SubTitle>
          <VideoContents videoDetail={videoDetail} />
        </>
      )}
      <Modal
        visible={checkModalVisible}
        title="확인 하셨나요?"
        cancleButton={false}
        onOk={() => setCheckModalVisible(false)}
      >
        <li>정면을 보고 서주세요.</li>
        <li>영상에 머리부터 발 끝까지 모두 다 나와야 해요.</li>
        <li>카메라는 수평으로 맞춰주세요.</li>
        <li>영상 중간에 구도(zoom, 수평 등)를 변경하지 마세요.</li>
        <li>되도록 깔끔한 배경에서 1명만 촬영해주세요.</li>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;
const Title = styled.h1`
  padding: 20px;
  padding-bottom: 0;
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;
const SubTitle = styled.h2`
  padding: 10px 0 20px 20px;
  font-size: 1.2rem;
  color: lightgray;
`;

export default RecordDancing;
