// ViewModel層：管理認證相關的狀態和邏輯
import { ref } from 'vue';
import { authService } from '../services/AuthService';
import type { UserCredentials, User } from '../models/UserModel';

/**
 * 認證相關的組合式函數
 * 管理認證狀態並提供認證方法
 */
export function useAuth() {
  // 狀態管理
  const user = ref<User | null>(null);        // 當前用戶信息
  const loading = ref(false);                 // 加載狀態
  const error = ref<string | null>(null);     // 錯誤信息

  /**
   * 用戶登入方法
   * @param credentials - 用戶登入憑證
   * @returns Promise<boolean> - 登入是否成功
   */
  const login = async (credentials: UserCredentials) => {
    loading.value = true;    // 開始加載
    error.value = null;      // 清除之前的錯誤
    try {
      // 調用認證服務進行登入
      user.value = await authService.login(credentials);
      return true;
    } catch (err) {
      // 處理錯誤
      error.value = err instanceof Error ? err.message : 'Login failed';
      return false;
    } finally {
      loading.value = false; // 結束加載
    }
  };

  /**
   * Google 登入方法
   * @returns Promise<boolean> - 登入是否成功
   */
  const googleSignIn = async () => {
    loading.value = true;    // 開始加載
    error.value = null;      // 清除之前的錯誤
    try {
      // 調用認證服務進行 Google 登入
      user.value = await authService.googleSignIn();
      return true;
    } catch (err) {
      // 處理錯誤
      error.value = err instanceof Error ? err.message : 'Google sign-in failed';
      return false;
    } finally {
      loading.value = false; // 結束加載
    }
  };

  // 返回狀態和方法
  return {
    user,       // 用戶信息
    loading,    // 加載狀態
    error,      // 錯誤信息
    login,      // 登入方法
    googleSignIn // Google 登入方法
  };
}
