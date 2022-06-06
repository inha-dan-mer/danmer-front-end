export type User = LoginUser & {
  email: string;
};

export type LoginUser = {
  username: string;
  password: string;
};

export interface Video {
  videoId: number;
  thumbnail: string;
  title: string;
  url: string;
  artist: string;
}

/**
 * response
 */

export type DancerVideo = {
  videoInfo: Video;
  dancer: {
    uid: number;
    name: string;
  };
};

export type PracticeVideo = {
  videoInfo: {
    videoId: number;
    feedback: any;
    url: string;
  };
  tutorVideoId: number;
};
