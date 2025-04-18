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
  "Firebase",
];

const backendType: string[] = [
  "Flask",
  "Django",
  "FastAPI",
  "ASP .NET Core",
  "Laravel",
  "Ruby on Rails",
  "ExpressJS",
  "Spring Boot",
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
  "Matlab",
  "Shell Script",
];

const cloudType: string[] = ["GCP", "AWS", "Azure"];

export enum ProgramSkillType {
  frontend = 0,
  backend = 1,
  iot = 2,
  cloud = 3,
  programLanguage = 4,
  other = 5,
}

export interface SkillTypeModel {
  id: ProgramSkillType;
  name: string;
}

export class SkillType {
  types: SkillTypeModel[] = [
    { id: ProgramSkillType.frontend, name: "前端" },
    { id: ProgramSkillType.backend, name: "後端" },
    { id: ProgramSkillType.iot, name: "韌體" },
    { id: ProgramSkillType.cloud, name: "雲端" },
    { id: ProgramSkillType.programLanguage, name: "程式語言" },
    { id: ProgramSkillType.other, name: "語言" },
  ];

  getTypeName(id: number): string {
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].id === id) {
        return this.types[i].name;
      }
    }

    return "no type";
  }

  getTypeId(name: string): number {
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].name === name) {
        return this.types[i].id;
      }
    }

    return -1;
  }
}
