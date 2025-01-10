import { SkillData } from "../models/reponse/skill_reponse_data";
import { ip, port } from "../main";
import APIClient from "./api_client";

///  技能相關API
export default class SkillService extends APIClient {
    constructor() {
        super(`http://${ip}:${port}/skill`);
    }

    /**
     * MARK: 取得所有Skill項目
     */
    async getSkillList(): Promise<SkillData> {

        const reponseData: SkillData | string = await this.apiGet(`/getList`);

        console.log(`getSkillList : ${reponseData}`);

        if (typeof reponseData === 'string') {
            throw new Error(`Failed`);
        }

        return reponseData;
    }
}