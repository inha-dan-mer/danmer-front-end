export type ResDancingVideos = {
  pk: number;
  video_name: string;
  video: string;
  thumbnail_img: string;
  user: number;
  created_at: string;
};

/* 영상 업로드 */
export type ReqUploadVideoParams = {
  video_name: string;
  video: string;
  thumbnail_img: string;
};
export type ResUploadVideo = {
  pk: number;
  video_name: string;
  video: string;
  thumbnail_img: string;
  user: number;
  created_at: string;
};
