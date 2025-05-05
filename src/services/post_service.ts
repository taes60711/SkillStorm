import type { PostBoard } from "@/models/reponse/post/post_board_reponse_data";
import { API_CONFIG } from "./api.config";
import APIClient from "./api_client";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import { userDataStore } from "@/global/user_data";
import { APIHttpController } from "@/global/api_http_controller";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import { GlobalData } from "@/global/global_data";
import type { PostComment } from "@/models/reponse/post/post_comment_reponse_data";

///  文章相關API
export default class PostService extends APIClient {
  constructor() {
    super(
      `${APIHttpController.prefixUrl}://${APIHttpController.domainUrl}/posts`
    );
  }

  /**
   * 人氣文章
   * @param page 從第幾頁開始
   * @param size 一次拿多少的資料
   * @param userId  使用者的uid
   * @returns
   */
  async getPostByViewer(
    page: number,
    size: number,
    userId: string
  ): Promise<Post[]> {
    const param = {
      page: page,
      size: size,
      uid: userId,
    };

    const reponseData: Post[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.POST.GET_ALL}`,
      param
    );

    if (typeof reponseData === "string") {
      return [];
    } else {
      const returnData: Post[] = reponseData.map((data) => {
        const postBoardType =
          GlobalData.postBoard.find((e) => e.type === data.type) ??
          GlobalData.postBoard[0];
        return {
          ...data,
          type: postBoardType,
        };
      });
      return returnData;
    }
  }

  /**
   * 最新文章
   * @param page 從第幾頁開始
   * @param size 一次拿多少的資料
   * @param userId  使用者的uid
   * @returns
   */
  async getPostBytime(
    page: number,
    size: number,
    userId: string
  ): Promise<Post[]> {
    const param = {
      page: page,
      size: size,
      uid: userId,
    };

    const reponseData: Post[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.POST.GET_NEW}`,
      param
    );

    if (typeof reponseData === "string") {
      return [];
    } else {
      const returnData: Post[] = reponseData.map((data) => {
        const postBoardType =
          GlobalData.postBoard.find((e) => e.type === data.type) ??
          GlobalData.postBoard[0];
        return {
          ...data,
          type: postBoardType,
        };
      });
      return returnData;
    }
  }

  /**
   * 人氣文章
   * @param page 從第幾頁開始
   * @param size 一次拿多少的資料
   * @param userId  使用者的uid
   * @returns
   */
  async getPostByType(
    page: number,
    size: number,
    userId: string,
    type: number
  ): Promise<Post[]> {
    const param = {
      page: page,
      size: size,
      uid: userId,
    };

    const reponseData: Post[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.POST.GET_TYPE}/${type}`,
      param
    );

    if (typeof reponseData === "string") {
      return [];
    } else {
      const returnData: Post[] = reponseData.map((data) => {
        const postBoardType =
          GlobalData.postBoard.find((e) => e.type === data.type) ??
          GlobalData.postBoard[0];
        return {
          ...data,
          type: postBoardType,
        };
      });
      return returnData;
    }
  }

  /**
   * MARK: 取得所有看板項目
   */
  async getAllPostBoard(): Promise<PostBoard[]> {
    const reponseData: PostBoard[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.POST.GET_ALL_POST_BOARD}`
    );

    const iconData: string[] = [
      "fa-solid fa-comment-dots",
      "fa-solid fa-code",
      "fa-solid fa-globe",
      "fa-solid fa-microchip",
      "fa-solid fa-head-side-virus",
    ];

    if (Array.isArray(reponseData)) {
      reponseData.forEach((value, index) => {
        value.iconData = iconData[index];
      });
    }

    console.log(`getPostBoard : ${reponseData}`);

    if (typeof reponseData === "string") {
      throw new Error(`Failed`);
    }

    return reponseData;
  }

  /**
   * MARK: 創建文章
   */
  async createPost(postData: CreatePostRequestData): Promise<void> {
    let fileMessageStr: string = "[]";

    fileMessageStr = this.listToListStr(postData.fileMessage);

    const body = {
      createdBy: userDataStore.userData.value?.uid, // 創文章者
      title: "", // 標題
      mainMessage: postData.content, // 內文
      fileMessage: fileMessageStr, // 圖片/影片
      type: postData.type, // 看板
    };
    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.POST.CREATE_POST}`,
      body
    );

    console.log(`createPost : ${reponseData}`);

    if (typeof reponseData === "string") {
      throw new Error(`Failed`);
    }
  }

  /**
   * 文章留言
   * @param page 從第幾頁開始
   * @param size 一次拿多少的資料
   * @param postId  文章的uid
   * @returns
   */
  async getPostComment(
    page: number,
    size: number,
    postId: number
  ): Promise<PostComment[]> {
    const param = {
      page: page,
      size: size,
    };

    const reponseData: PostComment[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.POST.GET_POST_COMMENT}/${postId}`,
      param
    );

    if (typeof reponseData === "string") {
      return [];
    } else {
      return reponseData;
    }
  }

  listToListStr(list: string[]): string {
    let result = "[";

    for (let i = 0; i < list.length; i++) {
      result += `"${list[i]}"`;
      if (i < list.length - 1) {
        result += ",";
      }
    }

    result += "]";
    return result;
  }
}
