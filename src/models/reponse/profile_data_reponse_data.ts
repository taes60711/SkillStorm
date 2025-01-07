/**
 * 使用者的Data
 */
export interface ProfileData {
    uid: string;
    email: string;
    password: string;
    image: string | null;
    introduction: string;
    job: string;
    lastlogin: string;
    name: string;
    skills: Skill[];
    wantSkills: Skill[];
    status: number;
}

interface Skill {
    name: string;
    level: number;
    month: number;
}
