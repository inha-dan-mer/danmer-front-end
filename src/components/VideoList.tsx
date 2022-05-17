import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { getPracticeVideos } from '@/api/main.api';
import { DancerVideo } from '@/interfaces/app.interface';

import VideoItem from './VideoItem';

const VideoList = () => {
  const [videoList, setVideoList] = useState<DancerVideo[] | null>(null);

  useEffect(() => {
    getPracticeVideos()
      .then((data) => {
        setVideoList(data);
      })
      .catch((reason) => {
        // TODO 토스트 메세지 컴포넌트
        console.error(reason);
      });
  }, []);

  return (
    <Container>
      {videoList &&
        videoList.map(({ videoInfo, dancer }) => (
          <li key={videoInfo.videoId}>
            <VideoItem
              thumbnailImgUrl={videoInfo.thumbnail}
              videoId={videoInfo.videoId}
              videoTitle={videoInfo.title}
              videoUrl={videoInfo.url}
              dancerName={dancer.name}
            />
          </li>
        ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default VideoList;
