import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { DancerVideo } from '@/interfaces/app.interface';
import { getVideoDetail } from '@/api/main.api';

import VideoContents from './VideoContents';

const RecordDancing = () => {
  const params = useParams();
  const [videoDetail, setVideoDetail] = useState<DancerVideo>();

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
