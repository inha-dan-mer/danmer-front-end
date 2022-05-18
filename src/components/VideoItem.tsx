import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { URL_VALUE } from '@/utils/constants';

import Button from '@/components/buttons/Button';

interface Props {
  thumbnailImgUrl?: string;
  videoId: number;
  videoTitle: string;
  videoUrl: string;
  dancerName: string;
}

const VideoItem = ({ thumbnailImgUrl, videoId, videoTitle, videoUrl, dancerName }: Props) => {
  let mouseEnterTimer = useRef<NodeJS.Timeout>();
  const previewRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (videoUrl: string) => {
    mouseEnterTimer.current = setTimeout(() => {
      setHovered(true);
      previewRef.current?.play();
    }, 600);
  };

  const handleMouseLeave = () => {
    if (mouseEnterTimer.current) {
      clearTimeout(mouseEnterTimer.current);
      setHovered(false);
      // @ts-ignore
      previewRef.current?.currentTime = 0;
      previewRef.current?.pause();
    }
  };

  const handleTimeUpdate = (time: number) => {
    if (!previewRef.current) return;

    if (time > 10) {
      // @ts-ignore
      previewRef.current?.currentTime = 0;
    }
  };

  return (
    <ThumbnailContainer
      onMouseEnter={() => handleMouseEnter(videoUrl)}
      onMouseLeave={handleMouseLeave}
      hovered={hovered}
    >
      <VideoContainer>
        <Video
          ref={previewRef}
          src={videoUrl}
          preload="metadata"
          onTimeUpdate={(e) => handleTimeUpdate((e.target as HTMLVideoElement).currentTime)}
        ></Video>
        <ThumbnailImgWrapper hovered={hovered}>
          <img src={thumbnailImgUrl} />
        </ThumbnailImgWrapper>
      </VideoContainer>
      <Info className="videolist__videoinfo">
        <Title>{videoTitle}</Title>
        <SubTitle>{dancerName}</SubTitle>
      </Info>
      <Buttons className="videolist__videoinfo--btn">
        <Button
          onClick={() => navigate(URL_VALUE.videoDetail.replace(':videoId', videoId.toString()))}
        >
          연습하기
        </Button>
        <Button
          onClick={() => navigate(URL_VALUE.videoDetail.replace(':videoId', videoId.toString()))}
        >
          피드백 받기
        </Button>
      </Buttons>
    </ThumbnailContainer>
  );
};

const ThumbnailContainer = styled.div<{ hovered: boolean }>`
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
const VideoContainer = styled.div`
  position: relative;
  width: 250px;
  height: 100%;
  overflow: hidden;

  & > * {
    position: absolute;
    top: 0;
  }
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ThumbnailImgWrapper = styled.div<{ hovered: boolean }>`
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-user-drag: none;
    transition: all 300ms;
    opacity: ${({ hovered }) => (hovered ? 0 : 1)};
  }
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

export default VideoItem;
