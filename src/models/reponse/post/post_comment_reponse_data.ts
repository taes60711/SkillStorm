import type { ProfileData } from "../auth/profile_data_reponse_data";

/**
 * 文章留言Data
 */
export interface PostComment {
  id: number;
  postId: number;
  userUid: string;
  message: string;
  postTime: string;
  user: ProfileData;
}
