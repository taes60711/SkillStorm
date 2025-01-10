// Model層：定義數據結構
// UserCredentials：用戶登入憑證的接口定義
export interface UserCredentials {
  email: string;    // 用戶郵箱
  password: string; // 用戶密碼
}

// SkillInfo：技能信息的接口定義
export interface SkillInfo {
  name: string;     // 技能名稱
  level: number;    // 技能等級
  month: number;    // 學習月數
}

// User：用戶基本信息的接口定義
export interface User {
  uid: string;           // 用戶唯一標識
  token: string | null;  // 用戶token
  image: string | null;  // 用戶頭像
  email: string;         // 用戶郵箱
  password: string;      // 用戶密碼
  googlePwd: string;     // Google登錄密碼
  name: string;          // 用戶名稱
  job: string | null;    // 職業
  introduction: string | null;  // 個人介紹
  lastlogin: string | null;    // 最後登錄時間
  status: number;        // 用戶狀態
  isEmailVerified: boolean;    // 郵箱是否已驗證
  skills: SkillInfo[];         // 用戶技能列表
  wantSkills: SkillInfo[];     // 想學習的技能列表
}

// GoogleSignInData：Google登錄數據的接口定義
export interface GoogleSignInData {
  email: string;     // Google郵箱
  googlePwd: string; // Google ID作為密碼
}
