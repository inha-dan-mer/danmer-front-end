import axios from 'axios';
import env from '@/config/env';

const instance = axios.create({
  baseURL: env.API_URL,
});

export default instance;
