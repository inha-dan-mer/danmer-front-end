import axios from '@/utils/request';

import { User } from '@/types';

export const signUp = (user: User) => axios.post<User>('/accounts/signup', user);
