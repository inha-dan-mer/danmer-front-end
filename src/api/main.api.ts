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
