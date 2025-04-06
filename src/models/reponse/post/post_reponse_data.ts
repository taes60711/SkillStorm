import type { ProfileData } from "../auth/profile_data_reponse_data";
import type { PostBoard } from "./post_board_reponse_data";

/**
 * 文章Data
 */
export interface Post {
  id: number;
  createdBy: string;
  mainMessage: string;
  fileMessage: string[];
  viewed: number;
  good: number;
  type: number | PostBoard;
  count: number;
  userIsGood: boolean;
  postTime: string;
  user: ProfileData;
}
