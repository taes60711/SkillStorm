import type { PostBoard } from "@/models/reponse/post/post_board_reponse_data";

/**
 * 創文章用Data
 */
export interface CreatePostRequestData {
  postId?: number;
  type: number | PostBoard; // 看板
  content: string; // 內文
  fileMessage: string[];
}
