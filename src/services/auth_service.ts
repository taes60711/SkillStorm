import APIClient from "./api_client";
import { ProfileData } from "../models/reponse/profile_data_reponse_data";
import * as cryptoJS from 'crypto-js';
import { SignUpRequestData } from "@/models/request/sign_up_request_data";

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
   * 一般註冊
   * @param captchaCode 驗證碼
   * @param signUpdata 信箱, 未加密的密碼, 名稱
   */
  async signUp(captchaCode: string, signUpdata: SignUpRequestData) {

    const sha256Password = cryptoJS.SHA256(signUpdata.password).toString(cryptoJS.enc.Hex);

    console.log(`sha256Password : ${sha256Password}`);

    const body: { [key: string]: any } = {
      "email": signUpdata.email,
      "password": `${sha256Password}`,
      "name": signUpdata.name,
    };

    const reponseData: string = await this.apiPush(`/signUp/${captchaCode}`, body);

    console.log(`signUpUser : ${reponseData}`);
  }

}