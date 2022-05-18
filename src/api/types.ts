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
  videoName: string;
  video: string;
  thumbnailImg: string;
};
export type ResUploadVideo = {
  pk: number;
  video_name: string;
  video: string;
  thumbnail_img: string;
  user: number;
  created_at: string;
};
