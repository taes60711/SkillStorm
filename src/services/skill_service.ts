import type { SkillData } from "../models/reponse/skill_reponse_data";
import { API_CONFIG, ip, port } from "./api.config";
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

        const reponseData: SkillData | string = await this.apiGet(`${API_CONFIG.ENDPOINTS.SKILL.GET_ALL_SKILL}`);

        console.log(`getSkillList : ${reponseData}`);

        if (typeof reponseData === 'string') {
            throw new Error(`Failed`);
        }

        return reponseData;
    }
}