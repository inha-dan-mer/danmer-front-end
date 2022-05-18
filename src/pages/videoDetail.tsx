import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import { URL_VALUE } from '@/utils/constants';
import { DancerVideo } from '@/interfaces/app.interface';
import { getVideoDetail } from '@/api/main.api';

import Button from '@/components/buttons/Button';

const VideoDetailPage = () => {
  const navigation = useNavigate();
  const params = useParams();
  const [videoDetail, setVideoDetail] = useState<DancerVideo>();

  useEffect(() => {
    const { videoId } = params;
    if (!videoId) return;

    getVideoDetail(+videoId).then((res) => setVideoDetail(res));
  }, [params?.videoId]);

  // TODO 로딩 중 상태 표시
  return (
    <MainContainer>
      {videoDetail && (
        <>
          <video
            src={videoDetail.videoInfo.url}
            style={{ width: '100%' }}
            preload="metadata"
            controls
          ></video>
          <DetailButtons>
            <Button
              onClick={() =>
                navigation(
                  URL_VALUE.recordDancing.replace(
                    ':videoId',
                    videoDetail.videoInfo.videoId.toString()
                  )
                )
              }
            >
              피드백 받으러 가기
            </Button>
          </DetailButtons>
        </>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  & > * {
    max-width: 1060px;
  }
`;
const DetailButtons = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px 20px;
`;

export default VideoDetailPage;
