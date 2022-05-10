import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DancerVideo } from '@/interfaces/app.interface';
import { getPracticeVideos } from '@/api/main.api';

const VideoList = () => {
  const [videoList, setVideoList] = useState<DancerVideo[] | null>(null);

  useEffect(() => {
    getPracticeVideos()
      .then(({ data }) => {
        setVideoList(data);
      })
      .catch((reason) => {
        // TODO 토스트 메세지 컴포넌트
        console.error(reason);
      });
  }, []);

  return (
    <Container>
      {videoList?.map(({ videoInfo, dancer }) => (
        <li key={videoInfo.videoId}>
          <ThumbnailContainer>
            <Info>
              <Title>{videoInfo.title}</Title>
              <SubTitle>{dancer.name}</SubTitle>
            </Info>
            <ThumbnailImg src={videoInfo.thumbnail} />
          </ThumbnailContainer>
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
const ThumbnailContainer = styled.div`
  position: relative;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 150ms;
  transform: translate3d(0, 0, 0);

  img {
    transition: transform 1s;
    filter: brightness(30%);
  }

  &:hover {
    cursor: pointer;
    transform: translate3d(0, -4px, 0);

    img {
      filter: brightness(100%);
    }
  }
`;
const Info = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;
const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #eee;
`;
const SubTitle = styled.span`
  font-size: 1.2rem;
  color: #d3d3d3;
`;
const ThumbnailImg = styled.img`
  position: relative;
  top: 0;
  width: 250px;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;

export default VideoList;
