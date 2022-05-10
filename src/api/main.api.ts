import axios from 'axios';
import env from '@/config/env';

import { DancerVideo } from '@/interfaces/app.interface';

export const getPracticeVideos = () => axios.get<DancerVideo[]>(`${env.API_URL}/videos`);
