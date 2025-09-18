import { ref } from "vue";
import type { ProfileData } from "@/models/reponse/auth/profile_data_reponse_data";
import UserService from "@/services/user_service";

/**
 * UserDataStore
 * 用於管理全局的用戶狀態，包括保存、更新、清除和恢復用戶資料。
 * 使用單例模式，確保全局只有一個實例。
 */
export default class UserDataStore {
  private static instance: UserDataStore;

  private constructor() {}

  public static getInstance(): UserDataStore {
    if (!UserDataStore.instance) {
      UserDataStore.instance = new UserDataStore();
    }
    return UserDataStore.instance;
  }

  // 用戶狀態：存儲當前用戶資料
  userData = ref<ProfileData>(this.guestData());

  /**
   * 訪客用戶資料
   * @returns 訪客用戶資料
   */
  guestData(): ProfileData {
    return {
      uid: "guest",
      email: "",
      password: "",
      image: null,
      name: "未登入",
      introduction: "",
      lastlogin: "",
      job: "",
      skills: [],
      wantSkills: [],
      status: 999
    };
  }

  /**
   * 設定用戶資料
   * 將資料保存到內存和 localStorage 中，覆蓋現有資料。
   * @param {ProfileData} data 完整的用戶資料
   */
  setUser(data: ProfileData) {
    this.userData.value = data;
    localStorage.setItem("skillStormUserUID", data.uid);
    console.log("設置用戶資料:", data);
  }

  /**
   * 清除用戶資料
   * 清空內存中的用戶資料，並移除 localStorage 中的對應資料。
   */
  clearUser() {
    this.userData.value = this.guestData();
    localStorage.removeItem("skillStormUserUID");
    console.log("清除用戶資料");
  }

  /**
   * 是否有登入
   * @returns true: 有登入, false: 未登入
   */
  isLogin(): boolean {
    return this.userData.value.uid != this.guestData().uid;
  }

  /**
   * 初始化時從 localStorage 恢復資料
   * 在應用啟動時調用，從 localStorage 中載入用戶資料並恢復到內存。
   * @returns {boolean} 是否成功恢復用戶資料
   */
  async init(): Promise<void> {
    const storedUser: string = localStorage.getItem("skillStormUserUID") ?? "";

    if (storedUser != "") {
      const userUid = storedUser;

      const userData: ProfileData = await new UserService().getUserDataByUID(
        userUid
      );

      debugger;
      this.userData.value = userData;
      // 成功恢復
      console.log("從 localStorage 恢復用戶資料:", this.userData.value);
    }
  }
}

// 導出單例實例，供全局使用
export const userDataStore = UserDataStore.getInstance();
