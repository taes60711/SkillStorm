// /src/global/user_data.ts
// 全局用戶資料管理 (UserDataStore)
import { ref, computed } from "vue";
import type { ProfileData } from "@/models/reponse/auth/profile_data_reponse_data";

/**
 * UserDataStore
 * 用於管理全局的用戶狀態，包括保存、更新、清除和恢復用戶資料。
 * 使用單例模式，確保全局只有一個實例。
 */
export default class UserDataStore {
  // 單例實例
  private static instance: UserDataStore;

  // 私有構造函數，禁止外部直接創建實例
  private constructor() { }

  /**
   * 獲取單例實例
   * 確保全局只有一個 UserDataStore 實例。
   * @returns {UserDataStore} 單例實例
   */
  public static getInstance(): UserDataStore {
    if (!UserDataStore.instance) {
      UserDataStore.instance = new UserDataStore();
    }
    return UserDataStore.instance;
  }

  // 用戶狀態：存儲當前用戶資料
  private user = ref<ProfileData | null>(null);

  /**
   * 獲取用戶資料
   * @returns {computed<ProfileData | null>} 響應式用戶資料
   */
  get userData() {
    return computed(() => this.user.value);
  }

  /**
   * 設定用戶資料
   * 將資料保存到內存和 localStorage 中，覆蓋現有資料。
   * @param {ProfileData} data 完整的用戶資料
   */
  setUser(data: ProfileData) {
    this.user.value = data;
    localStorage.setItem("skillStormUserData", JSON.stringify(data));
    console.log("設置用戶資料:", data);
  }

  /**
   * 更新用戶資料
   * 局部更新用戶資料，僅更新提供的屬性，並同步到 localStorage。
   * @param {Partial<ProfileData>} data 要更新的用戶資料屬性
   */
  updateUser(data: Partial<ProfileData>) {
    if (this.user.value) {
      Object.assign(this.user.value, data); // 局部更新用戶資料
      localStorage.setItem(
        "skillStormUserData",
        JSON.stringify(this.user.value)
      );
      console.log("更新用戶資料:", this.user.value);
    }
  }

  /**
   * 清除用戶資料
   * 清空內存中的用戶資料，並移除 localStorage 中的對應資料。
   */
  clearUser() {
    this.user.value = null;
    localStorage.removeItem("skillStormUserData");
    console.log("清除用戶資料");
  }

  /**
   * 初始化時從 localStorage 恢復資料
   * 在應用啟動時調用，從 localStorage 中載入用戶資料並恢復到內存。
   * @returns {boolean} 是否成功恢復用戶資料
   */
  initializeFromLocalStorage(): boolean {
    const storedUser = localStorage.getItem("skillStormUserData");
    if (storedUser) {
      this.user.value = JSON.parse(storedUser) as ProfileData;
      console.log("從 localStorage 恢復用戶資料:", this.user.value);
      return true; // 成功恢復
    }
    console.log("localStorage 中沒有用戶資料");
    return false; // 沒有用戶資料
  }
}

// 導出單例實例，供全局使用
export const userDataStore = UserDataStore.getInstance();
