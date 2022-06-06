import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import env from '@/config/env';

import VideoList from '@/components/VideoList';
import Button from '@/components/buttons/Button';

const MainPage = () => {
  const navigate = useNavigate();

  const connectSSE = () => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const { user_id } = JSON.parse(user);

    const eventSource = new EventSource(`${env.API_URL}/feedback/${user_id}/sse`);

    eventSource.addEventListener('sse', function (event) {
      const data = JSON.parse(event.data);
      console.log(data);

      // (async () => {
      //   // 브라우저 알림
      //   const showNotification = () => {
      //     const notification = new Notification('코드 봐줘', {
      //       body: data.content,
      //     });

      //     setTimeout(() => {
      //       notification.close();
      //     }, 10 * 1000);

      //     notification.addEventListener('click', () => {
      //       window.open(data.url, '_blank');
      //     });
      //   };

      //   // 브라우저 알림 허용 권한
      //   let granted = false;

      //   if (Notification.permission === 'granted') {
      //     granted = true;
      //   } else if (Notification.permission !== 'denied') {
      //     let permission = await Notification.requestPermission();
      //     granted = permission === 'granted';
      //   }

      //   // 알림 보여주기
      //   if (granted) {
      //     showNotification();
      //   }
      // })();
    });
  };

  useEffect(() => {
    connectSSE();
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
