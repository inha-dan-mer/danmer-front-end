import axios from 'axios';

import env from '@/config/env';
import { URL_VALUE } from './constants';

const instance = axios.create({
  baseURL: env.API_URL,
});

instance.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (!user) {
    // @ts-ignore
    delete config.headers['x-auth-token'];
    return config;
  }
  const { token } = JSON.parse(user);
  // @ts-ignore
  config.headers['x-auth-token'] = token;
  return config;
});

instance.interceptors.response.use((res) => {
  if (res.status === 401) {
    localStorage.removeItem('user');
    window.open(URL_VALUE.signIn);
  }
  return res;
});

export default instance;
