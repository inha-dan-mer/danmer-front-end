import axios from '@/utils/request';

import { DancerVideo } from '@/interfaces/app.interface';
import { ResDancingVideos, ResUploadVideo } from './types';

export const getPracticeVideos = () =>
  axios.get<ResDancingVideos[]>(`/dancing`).then(({ data }) =>
    data.map(
      (info): DancerVideo => ({
        videoInfo: {
          videoId: info.pk,
          thumbnail: info.thumbnail_img,
          title: info.video_name,
          url: info.video,
          artist: info.singer,
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
  axios.get<ResDancingVideos>(`/dancing/${videoId}`).then(
    ({ data: info }): DancerVideo => ({
      videoInfo: {
        videoId: info.pk,
        thumbnail: info.thumbnail_img,
        title: info.video_name,
        url: info.video,
        artist: info.singer,
      },
      dancer: {
        uid: info.user,
        name: '',
      },
    })
  );

export const uploadDancingVideoFile = (formData: FormData) =>
  axios
    .post<ResUploadVideo>('/dancing', formData, {
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

export const uploadPracticeVideoFile = (formData: FormData) =>
  axios
    .post<ResUploadVideo>('/practice', formData, {
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
