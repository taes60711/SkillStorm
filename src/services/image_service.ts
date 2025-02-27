import { APIHttpController } from "@/global/api_http_controller";
import APIClient from "./api_client";

///  圖片相關API
export default class ImageService extends APIClient {
    constructor() {
        super(`${APIHttpController.prefixUrl}://${APIHttpController.domainUrl}/images`);
    }
    /**
     * 判斷上傳的圖片資訊是否已經存在在Server 
     * @param base64ImgStr 
     * @returns 存在 > 圖片的id, 不存在 > Failed
     */
    async imageIsExist(base64ImgStr: String): Promise<String> {
        const body = {
            image: base64ImgStr,
        };

        const responseData: String = await this.apiPush('/checkImage', body);

        console.log("imageIsExist : " + responseData);

        return responseData !== "null" ? responseData : "Failed";
    }

    /**
     * 將圖片存進資料庫內
     * @param base64ImgStr 本地端的圖片（需轉為base64）
     * @param id 圖片的uid(由前端創建)
     * @returns 
     */
    async saveImg(id: String, base64ImgStr: String): Promise<boolean> {
        const body = {
            id: id,
            image: base64ImgStr,
        };

        const responseData: string = await this.apiPush('/saveImg', body);

        console.log("imageIsExist : " + responseData);

        return responseData !== "null";
    }

}