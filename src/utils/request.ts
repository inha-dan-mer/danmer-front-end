import axios from 'axios';
import env from '@/config/env';

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

export default instance;
