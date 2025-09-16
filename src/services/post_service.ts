import type { PostBoard } from "@/models/reponse/post/post_board_reponse_data";
import { API_CONFIG } from "./api.config";
import APIClient from "./api_client";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import { userDataStore } from "@/global/user_data";
import { APIHttpController } from "@/global/api_http_controller";
import type { Post } from "@/models/reponse/post/post_reponse_data";
import { GlobalData } from "@/global/global_data";
import type { PostComment } from "@/models/reponse/post/post_comment_reponse_data";
import type { CreatePostCommentRequestData } from "@/models/request/post/create_post_comment_request_data";
import TokenService from "./token_service";
import type { APIResponseData } from "@/models/api_response_data";

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
      uid: userId === "guest" ? "" : userId
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
          type: postBoardType
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
      uid: userId === "guest" ? "" : userId
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
          type: postBoardType
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
      uid: userId === "guest" ? "" : userId
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
          type: postBoardType
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
  async getPostByMy(
    page: number,
    size: number,
    myUserId: string
  ): Promise<Post[]> {
    const param = {
      page: page,
      size: size
    };

    const reponseData: Post[] | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.POST.GET_MY_POST}/${myUserId}`,
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
          type: postBoardType
        };
      });

      return returnData;
    }
  }

  /**
   * 外部文章
   * @param postId 文章Id
   * @returns
   */
  async getPostByPostId(postId: Number): Promise<Post | String> {
    const param = {
      id: postId
    };

    const reponseData: Post | string = await this.apiGet(
      `${API_CONFIG.ENDPOINTS.POST.GET_POST_BY_ID}`,
      param
    );

    if (typeof reponseData === "string") {
      return "";
    } else {
      return reponseData;
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
      "fa-solid fa-head-side-virus"
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
   * @param postData 創建文章的Data
   */
  async createPost(postData: CreatePostRequestData): Promise<void> {
    let fileMessageStr: string = "[]";

    fileMessageStr = this.listToListStr(postData.fileMessage);

    const body = {
      createdBy: userDataStore.userData.value.uid, // 創文章者
      title: "", // 標題（畫面上已移除）
      mainMessage: postData.content, // 內文
      fileMessage: fileMessageStr, // 圖片/影片
      type: postData.type // 看板
    };
    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.POST.CREATE_POST}`,
      body
    );

    console.log(`createPost : ${reponseData}`);
  }

  /**
   * MARK: 更新文章
   * @param postId  文章的id
   * @param postData 更新文章的Data
   */
  async updatePost(
    postId: number,
    postData: CreatePostRequestData
  ): Promise<Boolean> {
    let fileMessageStr: string = "[]";

    fileMessageStr = this.listToListStr(postData.fileMessage);

    /// Call Token API
    const token: string = await new TokenService().getToken(
      userDataStore.userData.value.uid
    );

    const body = {
      mainMessage: postData.content, // 內文
      fileMessage: fileMessageStr, // 圖片/影片
      type: postData.type // 看板
    };

    /// Call updatePost API
    const responseData: APIResponseData<string> | string = await this.apiPush<
      APIResponseData<string>
    >(`${API_CONFIG.ENDPOINTS.POST.UPDATE_POST}/${postId}`, body, {
      "X-OneTime-Token": token
    });

    /// Handle API Return Data
    const handledReponseData: APIResponseData<string> =
      this.handleReponseData(responseData);

    if (handledReponseData.statusCode != "200") {
      return false;
    }
    console.log("updatePost:", handledReponseData.data);
    return true;
  }

  /**
   * MARK: 更新文章
   * @param postId 更新文章的DataId
   */
  async updatePostGood(postId: number, userId: string = ""): Promise<void> {
    let body = {};

    if (userId !== "") {
      body = { goodedUserUID: userId };
    }

    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.POST.UPDATE_POST_GOOD}/${postId}`,
      body
    );

    console.log(`updatePostGood : ${reponseData}`);
  }

  /**
   * MARK: 刪除文章
   * @param postData 更新文章的Data
   */
  async deletePost(postId: number): Promise<void> {
    let body = {};

    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.POST.DELETE_POST}/${postId}`,
      body
    );

    console.log(`deletePost : ${reponseData}`);
  }

  /**
   * MARK: 創建文章留言
   * @param postCommentData 創建文章留言的Data
   */
  async createPostComment(
    postCommentData: CreatePostCommentRequestData
  ): Promise<number> {
    const body = {
      userUid: userDataStore.userData.value.uid, // 創留言者
      postId: postCommentData.postUID, // 文章ID
      message: postCommentData.message // 留言內容
    };
    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.POST.CREATE_POST_COMMENT}`,
      body
    );
    console.log(`createPostComment : ${reponseData}`);

    return Number(reponseData);
  }

  /**
   * MARK: 刪除文章留言
   * @param postId 文章的uid
   */
  async deletePostComment(postId: number): Promise<Boolean> {
    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.POST.DELETE_POST_COMMENT}/${postId}`
    );

    console.log(`deletePostComment : ${reponseData}`);

    return reponseData != "null" ? true : false;
  }

  /**
   * MARK: 更新文章留言
   * @param postId 文章的uid
   * @param message 留言訊息
   */
  async uploadPostComment(postId: number, message: string): Promise<Boolean> {
    const body = {
      id: postId, // 文章的uid
      message: message // 留言訊息
    };

    const reponseData: string = await this.apiPush(
      `${API_CONFIG.ENDPOINTS.POST.UPDATE_POST_COMMENT}/${postId}`,
      body
    );

    console.log(`uploadPostComment : ${reponseData}`);

    return reponseData != "null" ? true : false;
  }

  /**
   * 取得文章留言
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
      size: size
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
