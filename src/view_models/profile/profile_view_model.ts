import { ref, type Ref } from "vue";
import UserService from "@/services/user_service";
import type { ProfileData } from "@/models/reponse/auth/profile_data_reponse_data";
import { useRouter } from "vue-router";

export default class ProfileViewModel {
  // 初始化
  private router = useRouter();




  // 用戶 api
  private userService: UserService;

  // 用戶資料
  public userData: Ref<ProfileData | null>;

  // 用戶頭像圖片錯誤狀態
  public imageLoadError: Ref<boolean>;

  // 初始化
  constructor() {
    this.userService = new UserService();
    this.userData = ref<ProfileData | null>(null);
    this.imageLoadError = ref(false);
  }

  /**
   * 根據 UID 獲取用戶資料
   * @param uid 用戶的 UID
   */
  async getUserDataByUID(uid: string) {
    if (!uid) {
      console.warn("UID 不能為空");

      // 如果 UID 為空倒回首頁
      this.router.push("/");
      return;
    }

    try {
      const data = await this.userService.getUserDataByUID(uid);
      this.userData.value = data;
    } catch (error) {
      console.error("獲取用戶資料失敗", error);
      this.userData.value = null;
    }
  }

  // 獲取用戶資料
  public get profile(): ProfileData | null {
    return this.userData.value;
  }

  /**
   * 處理圖片錯誤
   */
  public handleImageError(): void {
    this.imageLoadError.value = true;
  }

  /**
   * 獲取頭像 URL
   * @returns 頭像 URL
   */
  public get avatarUrl(): string {
    if (!this.profile?.image || this.imageLoadError.value) {
      return "/src/assets/images/profile/default_avatar.png";
    }
    return this.profile.image;
  }
}
