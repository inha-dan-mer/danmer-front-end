export type User = LoginUser & {
  email: string;
};

export type LoginUser = {
  username: string;
  password: string;
};
