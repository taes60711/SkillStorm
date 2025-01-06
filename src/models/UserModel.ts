// Model層：定義數據結構
// UserCredentials：用戶登入憑證的接口定義
export interface UserCredentials {
  email: string;    // 用戶郵箱
  password: string; // 用戶密碼
}

// User：用戶基本信息的接口定義
export interface User {
  id: string;       // 用戶唯一標識
  email: string;    // 用戶郵箱
  name?: string;    // 用戶名稱（可選）
}
