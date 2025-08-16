/**
 * 創文章的留言用Data
 */
export interface CreatePostCommentRequestData {
  postUID: number; // 文章ID
  message: string; // 內文
}
