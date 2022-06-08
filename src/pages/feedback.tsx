import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { ResFeedbackVideo } from '@/api/types';
import { getVideoFeedback } from '@/api/main.api';

import { FEEDBACK_DURATION } from '@/utils/constants';

import Button from '@/components/buttons/Button';
import FeedbackProgressBar from '@/components/ProgressBar/FeedbackProgressBar';
import FeedbackColorInfo from '@/components/FeedbackColorInfo';

const isVideoPlaying = (video: HTMLVideoElement) =>
  !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

const FeedbackPage = () => {
  const params = useParams();
  const tutorRef = useRef<HTMLVideoElement>(null);
  const tuteeRef = useRef<HTMLVideoElement>(null);

  const [tuteVideoDuration, setTuteeVideoDuration] = useState<number>();
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [info, setInfo] = useState<ResFeedbackVideo>();

  const handlePlay = () => {
    if (!tutorRef?.current || !tuteeRef?.current) return;
    tuteeRef.current.play();
    tutorRef.current.play();
  };

  const handlePuase = () => {
    if (!tutorRef?.current || !tuteeRef?.current) return;
    tuteeRef.current.pause();
    tutorRef.current.pause();
  };

  const handleTimeUpdate = (time: number) => {
    if (!tutorRef?.current || !tuteeRef?.current) return;
    setCurrentTime(time / tuteeRef.current.duration);
  };

  const onPieceClick = (order: number) => {
    if (!tutorRef?.current || !tuteeRef?.current) return;
    tuteeRef.current.currentTime = order * FEEDBACK_DURATION;
    tutorRef.current.currentTime = order * FEEDBACK_DURATION;

    if (isVideoPlaying(tuteeRef.current)) {
      tuteeRef.current.play();
      tutorRef.current.play();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      handlePlay();
    } else {
      handlePuase();
    }
  }, [isPlaying]);

  useEffect(() => {
    const { videoId } = params;
    if (!videoId) return;
    getVideoFeedback(+videoId).then((data) => setInfo(data));
  }, [params]);

  if (!info) return null;
  return (
    <Container>
      <FeedbackColorInfo />
      <div>
        <div style={{ padding: '20px 0' }}>
          <FeedbackProgressBar
            position={currentTime}
            feedback={info.feedback_result}
            videoDuration={tuteVideoDuration}
            onPieceClick={onPieceClick}
          />
        </div>
        <Videos>
          <div style={{ flex: 1 }}>
            <ReverseVideo ref={tutorRef} src={info.tutor_video_url} />
          </div>
          <div style={{ flex: 1 }}>
            <ReverseVideo
              ref={tuteeRef}
              src={info.tutee_video_url}
              muted
              onLoadedMetadata={({ target }) =>
                setTuteeVideoDuration((target as HTMLVideoElement).duration)
              }
              onTimeUpdate={({ target }) =>
                handleTimeUpdate((target as HTMLVideoElement).currentTime)
              }
            />
          </div>
        </Videos>
      </div>
      <Button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '일시정지' : '재생'}</Button>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Videos = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
`;
const ReverseVideo = styled.video`
  width: 100%;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
`;

export default FeedbackPage;
