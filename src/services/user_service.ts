import APIClient from "./api_client";
import { ip, port } from "../main";
import * as cryptoJS from 'crypto-js';
import { ProfileData } from "../models/reponse/auth/profile_data_reponse_data";
import { SignUpRequestData } from "@/models/request/auth/sign_up_request_data";
import { LoginRequestData } from "@/models/request/auth/login_request_data";
import { UpdateProfileRequestData } from "@/models/request/auth/update_profile_request_data";

///  使用者相關API
export default class UserService extends APIClient {

  constructor() {
    super(`http://${ip}:${port}/user`);
  }

  /**
   * MARK:(自動登入) 取得使用者詳細資料 
   * @param userUID 登入的使用者的UID
   */
  async getUserDataByUID(userUID: string): Promise<ProfileData> {
    const reponseData: ProfileData | string = await this.apiGet(`/${userUID}`);

    if (typeof reponseData === 'string') {
      throw new Error(`Failed`);
    }

    return reponseData;
  }

  /**
   * MARK:(一般登入) 取得使用者詳細資料 
   * @param loginData email & pwd
   * @param loginType "normalSign"(一般登入) , "googleSign"(Google登入) 
   */
  async getUserDataByEmail(loginData: LoginRequestData, loginType: string = "normalSign"): Promise<ProfileData> {
    let sha256Password: string = "";

    if (loginType == "googleSign") {
      sha256Password = loginData.password;
    } else if (loginType == "normalSign") {
      sha256Password = cryptoJS.SHA256(loginData.password).toString(cryptoJS.enc.Hex);
    }

    const parameters: { [key: string]: any } = {
      "email": loginData.email,
      "password": `${sha256Password}`,
    };

    const reponseData: ProfileData | string = await this.apiGet(`/login`, parameters);

    if (typeof reponseData === 'string') {
      throw new Error(`Failed`);
    }

    return reponseData;
  }

  /**
   * MARK:更新使用者登入的時間
   * @param userUID 登入的使用者的UID
   */
  async updateUserLoginLastTime(userUID: string) {
    const lastLoginTime: string = new Date().toISOString();
    const body: { [key: string]: any } = {
      "uid": userUID,
      "lastlogin": lastLoginTime,
    };
    const reponseData: string = await this.apiPush(`/updateLoginTime/${userUID}`, body);

    console.log(`updateUserLoginLastTime : ${reponseData}`);
  }

  /**
   * MARK:一般註冊
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

    console.log(`signUp : ${reponseData}`);
  }

  /**
   * MARK:更新使用者資料
   * @param updateProfileData 
   */
  async updateProfileData(updateProfileData: UpdateProfileRequestData) {
    const body = Object.fromEntries(Object.entries(updateProfileData));

    const reponseData: string = await this.apiPush(`/update/${updateProfileData.uid}`, body);

    console.log(`updateProfileData : ${reponseData}`);

    // const body: { [key: string]: any } = {
    //   "uid": updateProfileData.uid,
    //   "name": updateProfileData.name,
    //   "image": updateProfileData.name,
    //   "job": updateProfileData.job,
    //   "introduction": updateProfileData.introduction,
    //   "skills": updateProfileData.skills,
    //   "wantSkills": updateProfileData.wantSkills,
    // };
  }

}