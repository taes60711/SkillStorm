import type { Skill } from "../../reponse/auth/profile_data_reponse_data";

/**
 * 更新使用者的Data
 */
export interface UpdateProfileRequestData {
    uid: string;
    image: string | null;
    introduction: string;
    job: string;
    name: string;
    skills: Skill[];
    wantSkills: Skill[];
}
