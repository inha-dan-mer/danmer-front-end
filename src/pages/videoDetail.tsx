import React from 'react';
import { useParams } from 'react-router-dom';

const VideoDetailPage = () => {
  const params = useParams();
  return <div>{params?.videoId || '없음'}</div>;
};

export default VideoDetailPage;
