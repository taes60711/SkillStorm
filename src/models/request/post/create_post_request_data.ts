/**
 * 創文章用Data
 */
export interface CreatePostRequestData {
    type: number; // 看板
    content: string; // 內文
    fileMessage: string[];
}