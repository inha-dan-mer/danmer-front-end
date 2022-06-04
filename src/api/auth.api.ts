import axios from '@/utils/request';

import { User, LoginUser } from '@/types';

export const signUp = (user: User) => axios.post<User>('/accounts/signup', user);
export const signIn = (user: LoginUser) => axios.post<LoginUser>('/accounts/login', user);
