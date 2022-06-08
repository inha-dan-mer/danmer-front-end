import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { getProcessingPracticeVideos } from '@/api/main.api';
import env from '@/config/env';

import VideoList from '@/components/VideoList';
import Button from '@/components/buttons/Button';

const MainPage = () => {
  const navigate = useNavigate();

  const [processingVideos, setProcessingVideos] = useState<number[]>([]);
  const eventSource = useRef<EventSource>();

  const connectSSE = () => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const { user_id } = JSON.parse(user);

    eventSource.current = new EventSource(`${env.API_URL}/feedback/${user_id}/sse`, {
      withCredentials: true,
    });

    eventSource.current.onmessage = function (event) {
      console.log('event', event);
      const data = JSON.parse(event.data);
      console.log('data', data);

      if (data.staus === 'success') {
        new Notification('피드백 도착 📥', { body: '나의 연습 영상 피드백이 도착했습니다!' });
      }
    };
  };

  const getNotificationPermission = () => {
    Notification.requestPermission().then((result) => {
      console.log(result);
      if (result === 'granted') {
        connectSSE();
        getProcessingPracticeVideos().then((data) => {
          if (data.length === 0) {
            eventSource.current?.close();
            eventSource.current = undefined;
          }
          setProcessingVideos(data);
        });
      }
    });
  };

  useEffect(() => {
    // getNotificationPermission();
    connectSSE();
    getProcessingPracticeVideos().then((data) => {
      if (data.length === 0) {
        eventSource.current?.close();
        eventSource.current = undefined;
      }
      setProcessingVideos(data);
    });
  }, []);

  return (
    <MainContainer>
      <MainHeader>
        <Button onClick={() => navigate('/video/upload?type=dancing')}>안무 영상 업로드</Button>
      </MainHeader>
      <main
        style={{ paddingTop: 30, paddingBottom: 30, display: 'flex', justifyContent: 'center' }}
      >
        <VideoList />
      </main>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.div`
  height: 100%;

  & > * {
    max-width: 1060px;
    margin: auto;
  }
`;
const MainHeader = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;
