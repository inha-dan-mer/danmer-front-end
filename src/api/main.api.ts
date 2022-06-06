import axios from '@/utils/request';

import { DancerVideo } from '@/interfaces/app.interface';
import {
  ReqUploadPracticeVideoParams,
  ReqUploadVideoParams,
  ResDancingVideos,
  ResUploadPracticeVideo,
  ResUploadVideo,
} from './types';

export const getPracticeVideos = () =>
  axios.get<ResDancingVideos[]>(`/dancing`).then(({ data }) =>
    data.map(
      (info): DancerVideo => ({
        videoInfo: {
          videoId: info.tutor_id,
          thumbnail: info.thumbnail_url,
          title: info.video_title,
          url: info.video_url,
          artist: info.song_artist,
        },
        dancer: {
          uid: info.uid,
          name: info.username,
        },
      })
    )
  );

export const getVideoRange = (videoUrl: string, range: [number, number]) =>
  axios.get(videoUrl, {
    headers: {
      Range: `bytes=${range[0] - range[1]}`,
    },
  });

export const getVideoDetail = (videoId: number) =>
  axios.get<ResDancingVideos>(`/dancing/${videoId}`).then(
    ({ data: info }): DancerVideo => ({
      videoInfo: {
        videoId: info.tutor_id,
        thumbnail: info.thumbnail_url,
        title: info.video_title,
        url: info.video_url,
        artist: info.song_artist,
      },
      dancer: {
        uid: info.uid,
        name: info.username,
      },
    })
  );

export const uploadDancingVideoFile = ({
  video_title,
  video_url,
  thumbnail_url,
  song_artist,
}: ReqUploadVideoParams) => {
  const formData = new FormData();
  formData.append('video_title', video_title);
  formData.append('video_url', video_url);
  formData.append('thumbnail_url', thumbnail_url);
  formData.append('song_artist', song_artist);

  return axios
    .post<ResUploadVideo>('/dancing', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data }) => ({
      videoInfo: {
        videoId: data.tutor_id,
        thumbnail: data.thumbnail_url,
        title: data.video_title,
        url: data.video_url,
      },
      dancer: {
        uid: data.uid,
        name: data.username,
      },
    }));
};

export const uploadPracticeVideoFile = ({
  tutor_video_id,
  tutee_video,
}: ReqUploadPracticeVideoParams) => {
  const formData = new FormData();
  formData.append('tutor_video_id', tutor_video_id.toString());
  formData.append('tutee_video', tutee_video);

  return axios.post<ResUploadPracticeVideo>('/practice', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
