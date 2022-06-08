export type ResAuthUser = {
  username: string;
  user_id: number;
  token: string;
};

export type ResDancingVideo = {
  tutor_id: number;
  video_title: string;
  video_url: string;
  thumbnail_url: string;
  song_artist: string;
  coordinate_url: string;
  uid: number;
  username: string;
};

export type ReqUploadVideoParams = {
  video_title: string;
  video_url: File;
  thumbnail_url: File;
  song_artist: string;
};

export type ReqUploadPracticeVideoParams = {
  tutor_video_id: number;
  tutee_video: File;
};
export type ResPracticeVideo = {
  tutee_id: number;
  tutee_video: string;
  tutor_video_id: number;
  feedback_result?: number[];
  uid: number;
  video_title: string;
  thumbnail_url: string;
  song_artist: string;
  tutor_username: string;
  tutor_uid: number;
};
export type ResFeedbackVideo = {
  video_title: string;
  tutee_id: number;
  tutor_id: number;
  tutee_video_url: string;
  tutor_video_url: string;
  feedback_result: number[];
};

export type ResUserVideos = {
  tutee_video_list: ResPracticeVideo[];
  tutor_video_list: ResDancingVideo[];
};
