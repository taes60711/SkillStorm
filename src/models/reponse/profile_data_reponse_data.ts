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

// export class ProfileData implements User {
//     uid: string = '';
//     email: string = '';
//     password: string = '';
//     image: string | null = null;
//     introduction: string = '';
//     job: string = '';
//     lastlogin: string = '';
//     name: string = '';
//     skills: Skill[] = [];
//     wantSkills: Skill[] = [];
//     status: number = 0;

//     constructor(
//         email?: string,
//         image?: string | null,
//         introduction?: string,
//         job?: string,
//         lastlogin?: string,
//         name?: string,
//         password?: string,
//         skills?: Skill[],
//         status?: number,
//         token?: string,
//         uid?: string,
//         wantSkills?: Skill[]
//     ) {
//         if (email) this.email = email;
//         if (image !== undefined) this.image = image;
//         if (introduction) this.introduction = introduction;
//         if (job) this.job = job;
//         if (lastlogin) this.lastlogin = lastlogin;
//         if (name) this.name = name;
//         if (password) this.password = password;
//         if (skills) this.skills = skills;
//         if (status !== undefined) this.status = status;
//         if (uid) this.uid = uid;
//         if (wantSkills) this.wantSkills = wantSkills;
//     }

//     static toJson(): string {
//         return JSON.stringify(this);
//     }

//     static fromJson(json: string): ProfileData {
//         const data = JSON.parse(json);
//         return new ProfileData(
//             data.email,
//             data.image,
//             data.introduction,
//             data.job,
//             data.lastlogin,
//             data.name,
//             data.password,
//             data.skills,
//             data.status,
//             data.uid,
//             data.wantSkills
//         );
//     }
// }
