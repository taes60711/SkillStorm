import type { PostBoard } from "@/models/reponse/post_board_reponse_data";
import { API_CONFIG } from "./api.config";
import APIClient from "./api_client";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import { userDataStore } from "@/global/user_data";
import { APIHttpController } from "@/global/api_http_controller";

///  文章相關API
export default class PostService extends APIClient {
    constructor() {
        super(`${APIHttpController.prefixUrl}://${APIHttpController.domainUrl}/posts`);
    }

    /**
     * MARK: 取得所有看板項目
     */
    async getAllPostBoard(): Promise<PostBoard[]> {



        const reponseData: PostBoard[] | string = await this.apiGet(`${API_CONFIG.ENDPOINTS.POST.GET_ALL_POST_BOARD}`);

        console.log(`getPostBoard : ${reponseData}`);

        if (typeof reponseData === 'string') {
            throw new Error(`Failed`);
        }

        return reponseData;
    }


    /**
     * MARK: 創建文章
     */
    async createPost(postData: CreatePostRequestData): Promise<void> {
        const body = {
            createdBy: userDataStore.userData.value?.uid,// 創文章者
            title: "", // 標題
            mainMessage: postData.content,// 內文
            fileMessage: postData.fileMessage, // 圖片/影片
            type: postData.type,// 看板
        };
        const reponseData: string = await this.apiPush(`${API_CONFIG.ENDPOINTS.POST.CREATE_POST}`, body);

        console.log(`createPost : ${reponseData}`);

        if (typeof reponseData === 'string') {
            throw new Error(`Failed`);
        }
    }
}