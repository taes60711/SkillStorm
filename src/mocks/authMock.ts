// Mock 數據：用於開發測試，待 Tom 接上實際 API 後移除
import { User, UserCredentials } from '../models/UserModel';

// 模擬用戶數據
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'test@example.com',
    name: '測試用戶',
    password: 'test123',  // 符合規則：6碼以上，包含英文和數字
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: '管理員',
    password: 'admin123',  // 符合規則：6碼以上，包含英文和數字
  }
];

// 模擬延遲時間（毫秒）
const MOCK_DELAY = 1000;

// 密碼驗證規則
const validatePassword = (password: string): boolean => {
  const isLengthValid = password.length >= 6;
  const hasEnglish = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return isLengthValid && hasEnglish && hasNumber;
};

// 模擬 API 響應
export const mockAuthApi = {
  // 檢查 email 是否已存在
  async checkEmailExists(email: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockUsers.some(user => user.email === email);
  },

  // 模擬註冊 API
  async register(userData: { email: string; password: string; name: string }): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    // 檢查 email 是否已存在
    if (await this.checkEmailExists(userData.email)) {
      throw new Error('此 Email 已被註冊');
    }

    // 驗證密碼
    if (!validatePassword(userData.password)) {
      throw new Error('密碼格式不正確，需要至少6碼且包含英文和數字');
    }

    // 建立新用戶
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      name: userData.name,
      password: userData.password,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // 將新用戶加入 mock 數據中
    mockUsers.push(newUser);

    // 回傳用戶資料（不包含密碼）
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // 模擬登入 API
  async login(credentials: UserCredentials): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('找不到此用戶');
    }

    if (!validatePassword(credentials.password)) {
      throw new Error('密碼格式不正確，需要至少6碼且包含英文和數字');
    }

    if (user.password !== credentials.password) {
      throw new Error('密碼錯誤');
    }

    // 回傳用戶資料（不包含密碼）
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // 模擬 Google 登入 API
  async googleSignIn(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    // 直接返回測試用戶（不包含密碼）
    const { password, ...userWithoutPassword } = mockUsers[0];
    return userWithoutPassword;
  },

  // 模擬獲取用戶資料 API
  async getUserProfile(userId: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('找不到此用戶');
    }

    // 回傳用戶資料（不包含密碼）
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};
