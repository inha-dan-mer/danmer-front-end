import axios from '@/utils/request';

import { DancerVideo } from '@/interfaces/app.interface';
import { ResDancingVideos } from './types';

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
