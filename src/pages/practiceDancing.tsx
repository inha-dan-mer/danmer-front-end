import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import VideoMedia from '@/components/VideoMedia';
import ProgressBar from '@/components/ProgressBar';

const PracticeDancing = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [mediaStream, setMediastream] = useState<MediaStream>();
  const params = useParams();
  console.log(params?.videoId);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log(stream);
        setMediastream(stream);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  const handleTimeUpdate = (time: number) => {
    // setCurrentVideoTime(time);
  };

  return (
    <Container>
      <Title>짱구는 못말려</Title>
      <SubTitle>뚜둔</SubTitle>
      <Videos>
        <div style={{ flex: 1 }}>
          <video
            ref={videoRef}
            src="https://danmer-videos.s3.amazonaws.com/%EC%A7%B1%EA%B5%AC.mp4"
            style={{ width: '100%' }}
            onPlay={() => console.log('play')}
            onEnded={() => console.log('end')}
            onTimeUpdate={({ target }) =>
              handleTimeUpdate((target as HTMLVideoElement).currentTime)
            }
            controls
          />
        </div>
        <Divider />
        <div style={{ flex: 1 }}>
          <VideoMedia mediaStream={mediaStream} mirrored style={{ width: '100%' }} />
        </div>
      </Videos>
      <ProgressBar value={30} />
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
const Divider = styled.div`
  height: inherit;
  width: 1px;
  background-color: tomato;
`;
const Videos = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
`;

export default PracticeDancing;
