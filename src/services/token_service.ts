import type { APIResponseData } from "@/models/api_response_data";
import APIClient from "./api_client";
import { APIHttpController } from "@/global/api_http_controller";

///  Token相關API
export default class TokenService extends APIClient {
  constructor() {
    super(
      `${APIHttpController.prefixUrl}://${APIHttpController.domainUrl}/token`
    );
  }

  /**
   * 取得Token(發佈 編輯 刪除相關API　都需要使用)
   * @param userUID 登入的使用者ID
   * @returns Token
   */
  async getToken(userUID: string): Promise<string> {
    const body: { [key: string]: any } = {
      userId: userUID
    };

    /// Call getToken API
    const reponseData: APIResponseData<{ token: string }> | string =
      await this.apiPush("/getToken", body);

    /// Handle API Return Data
    const handledReponseData: APIResponseData<{ token: string }> =
      this.handleReponseData(reponseData);

    if (handledReponseData.statusCode != "200") return "";

    return handledReponseData.data.token;
  }
}
