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
  feedback_result?: string;
  uid: number;
};

export type ResUserVideos = {
  tutee_video_list: ResPracticeVideo[];
  tutor_list_video: ResDancingVideo[];
};
