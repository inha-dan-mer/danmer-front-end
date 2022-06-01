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
              artist={videoInfo.artist}
            />
          </li>
        ))}
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-gap: 20px;

  @media only screen and (min-width: 1260px) {
    grid-template-columns: repeat(4, 250px);
  }
  @media only screen and (max-width: 1260px) {
    grid-template-columns: repeat(3, 250px);
  }
  @media only screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default VideoList;
