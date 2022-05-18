import axios from '@/utils/request';

import { DancerVideo } from '@/interfaces/app.interface';
import { ReqUploadVideoParams, ResDancingVideos, ResUploadVideo } from './types';

export const getPracticeVideos = () =>
  axios.get<ResDancingVideos[]>(`/videos`).then(({ data }) =>
    data.map(
      (info): DancerVideo => ({
        videoInfo: {
          videoId: info.pk,
          thumbnail: info.thumbnail_img,
          title: info.video_name,
          url: info.video,
        },
        dancer: {
          uid: info.user,
          name: '',
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
  axios.get<ResDancingVideos>(`/videos/${videoId}`).then(
    ({ data: info }): DancerVideo => ({
      videoInfo: {
        videoId: info.pk,
        thumbnail: info.thumbnail_img,
        title: info.video_name,
        url: info.video,
      },
      dancer: {
        uid: info.user,
        name: '',
      },
    })
  );

export const uploadDancingVideoFile = (formData: FormData) =>
  axios
    .post<ResUploadVideo>('/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data: info }) => ({
      videoInfo: {
        videoId: info.pk,
        thumbnail: info.thumbnail_img,
        title: info.video_name,
        url: info.video,
      },
      dancer: {
        uid: info.user,
        name: '',
      },
    }));

export const uploadPracticeVideoFile = () => axios.post('/practice');
