import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { DancerVideo } from '@/interfaces/app.interface';
import { getPracticeVideos } from '@/api/main.api';
import Button from '@/components/buttons/Button';

const VideoList = () => {
  const [videoList, setVideoList] = useState<DancerVideo[] | null>(null);

  useEffect(() => {
    getPracticeVideos()
      .then(({ data }) => {
        setVideoList(data.videos);
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
            <ThumbnailContainer>
              <ThumbnailImg src={videoInfo.thumbnail} />
              <Info className="videolist__videoinfo">
                <Title>{videoInfo.title}</Title>
                <SubTitle>{dancer.name}</SubTitle>
              </Info>
              <Buttons className="videolist__videoinfo--btn">
                <Button>연습하기</Button>
                <Button>피드백 받기</Button>
              </Buttons>
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
  .videolist__videoinfo {
    transition: all 150ms;
  }
  .videolist__videoinfo--btn {
    transition-timing-function: ease;
  }

  &:hover {
    cursor: pointer;
    transform: translate3d(0, -4px, 0);

    img {
      filter: brightness(100%);
    }
    .videolist__videoinfo {
      opacity: 0;
    }
    .videolist__videoinfo--btn {
      opacity: 1;
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
  -webkit-user-drag: none;
`;
const Buttons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 20px;
  opacity: 0;
  gap: 10px;
`;
export default VideoList;
