import APIClient from "./api_client";
import { ProfileData } from '../models/reponse/profile_data_reponse_data';


export default class UserService extends APIClient {
  apiType: string = "user";


  /// MARK: 取得使用者詳細資料 (自動登入)
  /// userUID: 登入使用者的(UID)
  async getUserDataByUID(userUID: string) {

    const result: string = await this.apiGet(`${this.apiType}/${userUID}`);
    const jsonString = JSON.stringify(result);
    console.log(result);
    const userInstance: ProfileData = ProfileData.fromJson(JSON.stringify(result));


    console.log(userInstance);

  }
}