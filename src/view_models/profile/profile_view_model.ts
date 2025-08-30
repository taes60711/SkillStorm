import { ref, type Ref } from "vue";
import UserService from "@/services/user_service";
import type { ProfileData } from "@/models/reponse/auth/profile_data_reponse_data";
import { userDataStore } from "@/global/user_data";
import { AppImage } from "@/global/app_image";

export default class ProfileViewModel {
  // 用戶 api
  private userService: UserService;

  // 用戶資料
  public userData: Ref<ProfileData | null>;

  // 初始化
  constructor() {
    this.userService = new UserService();
    this.userData = ref<ProfileData | null>(null);

    // 初始化時從全局狀態讀取資料
    this.userData.value = userDataStore.userData.value;

    debugger;
  }

  // 獲取用戶資料
  public get profile(): ProfileData | null {
    return this.userData.value;
  }
}
