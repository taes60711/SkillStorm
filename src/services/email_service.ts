import { ip, port } from "../main";
import APIClient from "./api_client";

///  登入/註冊相關API
export default class EmailService extends APIClient {
    constructor() {
        super(`http://${ip}:${port}/user`);
    }

    /**
     * MARK: 寄信（驗證碼）
     * @param email 信箱 
     * @param type  註冊: "signUp", 忘記密碼: "resetPwd"
     * @returns 該信箱已經存在: "emailExist", 成功寄送: "success"
     */
    async sendCaptchaMail(email: string, type: string): Promise<string> {

        const params: { [key: string]: any } = {
            email: email,
            emailType: type,
        };

        const reponseData: string = await this.apiGet(`/sendCaptchaMail`, params);

        console.log(`sendCaptchaMail : ${reponseData}`);

        return reponseData;
    }
}