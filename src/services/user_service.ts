import { AxiosResponse } from "axios";
import APIClient from "./api_client";
import { ProfileData } from "../models/reponse/profile_data_reponse_data";


export default class UserService extends APIClient {
  apiType: string = "user";

  /**
   * 取得使用者詳細資料 (自動登入)
   * @param userUID 登入的使用者的UID
   */
  async getUserDataByUID(userUID: string): Promise<ProfileData> {
    const reponseData: ProfileData | string = await this.apiGet(`${this.apiType}/${userUID}`);

    if (typeof reponseData === 'string') {
      throw new Error(`Failed`);
    }

    return reponseData;
  }
}