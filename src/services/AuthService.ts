// Model層：處理認證相關的業務邏輯
import { UserCredentials, User } from '../models/UserModel';
// 待 Tom 接上實際 API 後，移除這個 import
import { mockAuthApi } from '../mocks/authMock';

/**
 * 認證服務類
 * 負責處理所有與用戶認證相關的業務邏輯
 */
class AuthService {
  // 待 Tom 接上：這裡需要加入實際的 API 基礎路徑配置
  private baseUrl = '/api';  // 待 Tom 接上：替換成實際的 API 路徑

  /**
   * 用戶登入
   * @param credentials - 用戶登入憑證
   * @returns Promise<User> - 登入成功後返回用戶信息
   * @throws Error - 登入失敗時拋出錯誤
   */
  async login(credentials: UserCredentials): Promise<User> {
    try {
      // 使用 mock 數據，待 Tom 接上實際 API 後移除
      return await mockAuthApi.login(credentials);

      // 待 Tom 接上：下面是實際 API 的程式碼，目前註解掉
      /*
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '登入失敗');
      }

      const userData = await response.json();
      return userData;
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '登入失敗');
    }
  }

  /**
   * Google 登入
   * @returns Promise<User> - 登入成功後返回用戶信息
   * @throws Error - 登入失敗時拋出錯誤
   */
  async googleSignIn(): Promise<User> {
    try {
      // 使用 mock 數據，待 Tom 接上實際 API 後移除
      return await mockAuthApi.googleSignIn();

      // 待 Tom 接上：下面是實際 API 的程式碼，目前註解掉
      /*
      const response = await fetch(`${this.baseUrl}/google-signin`, {
        method: 'POST',
        headers: {
          // 待 Tom 接上：這裡可能需要添加認證相關的 headers
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Google 登入失敗');
      }

      const userData = await response.json();
      return userData;
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Google 登入失敗');
    }
  }
}

// 導出 AuthService 的單例
export const authService = new AuthService();
