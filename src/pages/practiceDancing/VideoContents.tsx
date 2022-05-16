import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';

import VideoMedia from '@/components/VideoMedia';
import ProgressBar from '@/components/ProgressBar';

const VideoContents = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [mediaStream, setMediastream] = useState<MediaStream>();

  const handleTimeUpdate = (time: number) => {
    setCurrentVideoTime(time);
  };

  const handlePlay = () => {
    console.log('play');
  };

  const handleEnd = () => {
    console.log('end');
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setMediastream(stream);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  return (
    <>
      <Videos>
        <div style={{ flex: 1 }}>
          <video
            ref={videoRef}
            src="https://danmer-videos.s3.amazonaws.com/%EC%A7%B1%EA%B5%AC.mp4"
            style={{ width: '100%' }}
            onPlay={handlePlay}
            onEnded={handleEnd}
            onTimeUpdate={({ target }) =>
              handleTimeUpdate((target as HTMLVideoElement).currentTime)
            }
            controls
          />
        </div>
        {useMemo(
          () => (
            <>
              <Divider />
              <div style={{ flex: 1 }}>
                <VideoMedia mediaStream={mediaStream} mirrored style={{ width: '100%' }} />
              </div>
            </>
          ),
          [mediaStream]
        )}
      </Videos>
      <ProgressBar max={videoRef.current?.duration} value={currentVideoTime} />
    </>
  );
};

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

export default VideoContents;
