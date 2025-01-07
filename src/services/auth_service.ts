import APIClient from "./api_client";
import { ProfileData } from "../models/reponse/profile_data_reponse_data";
import * as cryptoJS from 'crypto-js';

///  登入/註冊相關API
export default class AuthService extends APIClient {
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

  /**
   * 註冊帳號
   * @param captchaCode 驗證碼
   * @param email 信箱
   * @param password 未加密的密碼
   * @param name 名稱
   */
  async signUp(captchaCode: string, email: string, password: string, name: string) {

    const sha256Password = cryptoJS.SHA256(password).toString(cryptoJS.enc.Hex);

    console.log(`sha256Password : ${sha256Password}`);

    const body: { [key: string]: any } = {
      "email": email,
      "password": `${sha256Password}`,
      "name": name,
    };

    const reponseData: string = await this.apiPush('/signUp/$captchaCode', body);

    console.log(`signUpUser : ${reponseData}`);
  }

}