import axios from '@/utils/request';

import { LoginUser, User } from '@/interfaces/app.interface';
import { ResAuthUser } from './types';

export const signUp = (user: User) => axios.post<User>('/accounts/signup', user);
export const signIn = (user: LoginUser) =>
  axios.post<ResAuthUser>('/accounts/login', user).then(({ data }) => {
    localStorage.setItem('user', JSON.stringify(data));
  });
