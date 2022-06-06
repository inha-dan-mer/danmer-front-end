export type ResDancingVideos = {
  tutor_id: number;
  video_title: string;
  video_url: string;
  thumbnail_url: string;
  song_artist: string;
  coordinate_url: string;
  uid: number;
  username: string;
};

/* 영상 업로드 */
export type ReqUploadVideoParams = {
  video_title: string;
  video_url: File;
  thumbnail_img: File;
  song_artist: string;
};
export type ResUploadVideo = {
  tutor_id: number;
  video_title: string;
  video_url: string;
  thumbnail_url: string;
  song_artist: string;
  coordinate_url: string;
  uid: number;
  username: string;
};

export type ReqUploadPracticeVideoParams = {
  tutor_video_id: number;
  tutee_video: File;
};
export type ResUploadPracticeVideo = {
  tutee_id: number;
  tutee_video: string;
  tutor_video_id: number;
  feedback_result?: string;
  uid: number;
};
