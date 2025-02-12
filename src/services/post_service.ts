import type { PostBoard } from "@/models/reponse/post_board_reponse_data";
import { API_CONFIG, ip, port } from "./api.config";
import APIClient from "./api_client";

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
}