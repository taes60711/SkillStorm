import APIClient from "./api_client";

///  登入/註冊相關API
export default class AuthService extends APIClient {
    apiType: string = "user";

    /**
     * 寄信（驗證碼）
     * @param email 信箱 
     * @param type  註冊:"signUp", 忘記密碼:"resetPwd"
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