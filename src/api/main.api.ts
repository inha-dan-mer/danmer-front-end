import axios from 'axios';
import env from '@/config/env';

import { DancerVideo } from '@/interfaces/app.interface';

export const getPracticeVideos = () =>
  axios.get<{ videos: DancerVideo[] }>(`${env.API_URL}/videos`);
