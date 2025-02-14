import type { PostBoard } from "@/models/reponse/post_board_reponse_data";
import { API_CONFIG, ip, port } from "./api.config";
import APIClient from "./api_client";
import type { CreatePostRequestData } from "@/models/request/post/create_post_request_data";
import { userDataStore } from "@/global/user_data";

///  文章相關API
export default class PostService extends APIClient {
    constructor() {
        super(`http://${ip}:${port}/posts`);
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
            title: postData.title, // 標題
            mainMessage: postData.content,// 內文
            type: postData.type,// 看板
        };
        const reponseData: string = await this.apiPush(`${API_CONFIG.ENDPOINTS.POST.CREATE_POST}`, body);

        console.log(`createPost : ${reponseData}`);

        if (typeof reponseData === 'string') {
            throw new Error(`Failed`);
        }
    }
}