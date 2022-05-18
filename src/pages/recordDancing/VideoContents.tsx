import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { DancerVideo } from '@/interfaces/app.interface';

import ProgressBar from '@/components/ProgressBar';

interface Props {
  videoDetail: DancerVideo;
}

function wait(delayInMS: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

const VideoContents = ({ videoDetail }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const practiceVideoRef = useRef<HTMLVideoElement>(null);

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

  const startRecording = (lengthInMS: number) => {
    if (!mediaStream) return;

    let recorder = new MediaRecorder(mediaStream);
    let data: Blob[] = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    console.log(recorder.state + ' for ' + lengthInMS / 1000 + ' seconds...');

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      // @ts-ignore
      recorder.onerror = (event) => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(() => recorder.state == 'recording' && recorder.stop());

    return Promise.all([stopped, recorded]).then(() => data);
  };

  const stop = () => {
    if (!mediaStream) return;
    mediaStream.getTracks().forEach((track) => track.stop());
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

  useEffect(() => {
    if (!practiceVideoRef.current || !mediaStream) return;
    practiceVideoRef.current.srcObject = mediaStream;
    // @ts-ignore
    videoRef.current?.onplaying = () => {
      const duration = videoRef.current?.duration;
      if (!duration) return;
      startRecording(duration * 1000)?.then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: 'video/mp4' });
        console.log(recordedBlob);
      });
    };
    // @ts-ignore
    videoRef.current?.onended = () => {
      stop();
    };
  }, [mediaStream]);

  return (
    <>
      <Videos>
        <div style={{ flex: 1 }}>
          <video
            ref={videoRef}
            src={videoDetail.videoInfo.url}
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
                <WebCam ref={practiceVideoRef} autoPlay />
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
const WebCam = styled.video`
  width: 100%;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
`;

export default VideoContents;
