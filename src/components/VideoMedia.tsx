import styled from '@emotion/styled';
import React, { HTMLProps, useEffect, useRef } from 'react';

interface Props extends HTMLProps<HTMLVideoElement> {
  mediaStream?: MediaStream;
  mirrored?: boolean;
}

const VideoMedia = ({ mediaStream, mirrored = false, style }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !mediaStream) return;
    videoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  return <Video ref={videoRef} autoPlay mirrored={mirrored} style={style} />;
};

const Video = styled.video<{ mirrored: boolean }>`
  ${({ mirrored }) =>
    mirrored &&
    `  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */`}
`;

export default VideoMedia;
