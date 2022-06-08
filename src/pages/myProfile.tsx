import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { MyVideos } from '@/interfaces/app.interface';
import { getUserVideos } from '@/api/main.api';
import { URL_VALUE } from '@/utils/constants';

const MyProfilePage = () => {
  const navigate = useNavigate();

  const [myVideoList, setMyVideoList] = useState<MyVideos>();

  useEffect(() => {
    getUserVideos().then((data) => {
      setMyVideoList(data);
    });
  }, []);

  if (!myVideoList) return null;

  return (
    <MainContainer>
      <section style={{ flex: 1 }}>
        <Title>내가 연습한 영상</Title>
        {myVideoList.practice
          .map((video) => (
            <VideoCard
              onClick={() =>
                navigate(
                  URL_VALUE.feedback.replace(':videoId', video.videoInfo.videoId.toString()),
                  {
                    state: video,
                  }
                )
              }
            >
              <VideoCardId>{video.videoInfo.videoId}</VideoCardId>
              <img
                style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '2px' }}
                src={video.tutorVideo.thumbnailUrl}
              />
              <div style={{ padding: '0 10px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '5px' }}>
                  {video.tutorVideo.title}
                </div>
                <div>{video.tutorVideo.tutorName}</div>
              </div>
            </VideoCard>
          ))
          .reverse()}
      </section>
      <section style={{ flex: 1 }}>
        <Title>내가 올린 안무 영상</Title>
        {myVideoList.dancing
          .map((video) => (
            <VideoCard
              onClick={() =>
                navigate(
                  URL_VALUE.videoDetail.replace(':videoId', video.videoInfo.videoId.toString())
                )
              }
            >
              <VideoCardId>{video.videoInfo.videoId}</VideoCardId>
              <img
                style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '2px' }}
                src={video.videoInfo.thumbnail}
              />
              <div style={{ padding: '0 10px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '5px' }}>
                  {video.videoInfo.title}
                </div>
                <div>{video.videoInfo.artist}</div>
              </div>
            </VideoCard>
          ))
          .reverse()}
      </section>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  max-width: 1060px;
  margin: auto;
  gap: 50px;
`;
const Title = styled.h2`
  color: white;
  font-size: 1.4rem;
  margin-top: 40px;
  margin-bottom: 15px;
`;
const VideoCard = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-bottom: 10px;
  color: white;
  gap: 10px;

  border: 1px solid grey;
  border-radius: 8px;
  transition: 0.15s all ease;
  &:hover {
    box-shadow: white 0px 0px 8px;
  }
`;
const VideoCardId = styled.div`
  padding: 10px;
`;

export default MyProfilePage;
