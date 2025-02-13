const frontType: string[] = [
    "React",
    "Vue",
    "Angular",
    "Next",
    "Nuxt",
    "Qwik",
    "Bootstrap",
    "Html",
    "Css",
    "Svelte",
    "WordPress",
    "ReactNative",
    "Flutter",
    "Swift",
    "Android studio",
    "Firebase"
];

const backendType: string[] = [
    "Flask",
    "Django",
    "FastAPI",
    "ASP .NET Core",
    "Laravel",
    "Ruby on Rails",
    "ExpressJS",
    "Spring Boot"
];

const iotType: string[] = ["STM", "Arduino", "Raspberry Pi", "8051", "ARM"];

const programLanguageType: string[] = [
    "C",
    "C++",
    "C#",
    "Java",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Node.js",
    "Python",
    "Swift",
    "Matlab",
    "Shell Script"
];

const cloudType: string[] = ["GCP", "AWS", "Azure"];


export enum SkillType {
    frontend = 0,
    backend = 1,
    iot = 2,
    cloud = 3,
    programLanguage = 4,
    other = 5
}

export interface SkillTypeModel {
    id: SkillType;
    name: string;
}

export const SkillTypes: SkillTypeModel[] = [
    { id: SkillType.frontend, name: "前端" },
    { id: SkillType.backend, name: "後端" },
    { id: SkillType.iot, name: "韌體" },
    { id: SkillType.cloud, name: "雲端" },
    { id: SkillType.programLanguage, name: "程式語言" },
    { id: SkillType.other, name: "語言" }
];

