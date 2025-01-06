import APIClient from "./api_client";

export default class UserService extends APIClient{
    apiType: string = "user";


    /// MARK: 取得使用者詳細資料 (自動登入)
    /// userUID: 登入使用者的(UID)
    async getUserDataByUID(userUID: string){

      const result: String =  await this.apiGet(`${this.apiType}/${userUID}`);

      console.log(result);
    }
}