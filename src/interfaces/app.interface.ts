export interface Video {
  videoId: number;
  thumbnail: string;
  title: string;
  url: string;
}
export interface User {
  uid: number;
  name: string;
}

/**
 * response
 */

export type DancerVideo = { videoInfo: Video; dancer: User };
