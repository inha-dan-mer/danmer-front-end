import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { DancerVideo } from '@/interfaces/app.interface';

import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/buttons/Button';
import Modal from '@/components/Modal';
import { uploadPracticeVideoFile } from '@/api/main.api';

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
  const [recordedBlob, setRecordedBlob] = useState<string>();

  const startRecording = (lengthInMS: number) => {
    if (!mediaStream || !videoRef?.current?.duration) return;

    const recorder = new MediaRecorder(mediaStream);
    const data: Blob[] = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    videoRef.current.play();
    console.log(recorder.state + ' for ' + lengthInMS / 1000 + ' seconds...');

    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      // @ts-ignore
      recorder.onerror = (event) => reject(event.name);
    });

    const recorded = wait(lengthInMS).then(() => recorder.state == 'recording' && recorder.stop());

    return Promise.all([stopped, recorded]).then(() => data);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentVideoTime(time);
  };

  const handleStartButtonClick = () => {
    if (!videoRef?.current?.duration) return;

    const { duration } = videoRef.current;
    startRecording(duration * 1000)
      ?.then((recordedChunks) => {
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        setRecordedBlob(URL.createObjectURL(blob));
      })
      .catch((e) => console.error(e));
  };

  const uploadPracticeVideo = () => {
    if (!recordedBlob) return;

    fetch(recordedBlob)
      .then((r) => r.blob())
      .then((blob) => {
        const formData = new FormData();
        formData.append('tutor_video_id', videoDetail.videoInfo.videoId.toString());
        formData.append(
          'tutee_video',
          new File(
            [blob],
            `practice-${videoDetail.videoInfo.videoId}-${new Date().toISOString()}.mp4`,
            { type: 'video/mp4' }
          )
        );
        uploadPracticeVideoFile(formData);
      });

    setRecordedBlob(undefined);
    URL.revokeObjectURL(recordedBlob);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setMediastream(stream);
      })
      .catch((reason) => {
        console.error(reason);
      });
  }, []);

  useEffect(() => {
    if (!practiceVideoRef.current || !mediaStream) return;
    practiceVideoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  return (
    <Container>
      <div>
        <ProgressBar max={videoRef.current?.duration} value={currentVideoTime} />
        <Videos>
          <div style={{ flex: 1 }}>
            <video
              ref={videoRef}
              src={videoDetail.videoInfo.url}
              style={{ width: '100%' }}
              onTimeUpdate={({ target }) =>
                handleTimeUpdate((target as HTMLVideoElement).currentTime)
              }
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
      </div>
      <Button onClick={handleStartButtonClick}>녹화 시작</Button>
      <Modal visible={!!recordedBlob} title="연습 영상 미리보기" onOk={uploadPracticeVideo}>
        <video src={recordedBlob} style={{ width: '100%' }} controls />
      </Modal>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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
const WebCam = styled.video`
  width: 100%;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
`;

export default VideoContents;
