import { ref, type Ref, computed } from "vue";
import { reactive } from "@vue/reactivity";
import UserService from "@/services/user_service";
import type { ProfileData } from "@/models/reponse/auth/profile_data_reponse_data";
import type { UpdateProfileRequestData } from "@/models/request/auth/update_profile_request_data";
import { userDataStore } from "@/global/user_data";
import { RouterPath } from "@/router/router_path";
import router from "@/router/router_manager";

export default class EditProfileViewModel {
  private userService: UserService;
  private _bypassGuard: boolean = false;

  private originalData: Ref<ProfileData | null>;
  private _loading: Ref<boolean>;
  private _error: Ref<string>;
  public formData: UpdateProfileRequestData;
  public imageLoadError: Ref<boolean>;

  // 用戶資料
  public userData = computed(() => userDataStore.userData.value);

  constructor() {
    this.userService = new UserService();
    this._loading = ref(false);
    this._error = ref("");
    this.originalData = ref(null);
    this.imageLoadError = ref(false);

    this.formData = reactive<UpdateProfileRequestData>({
      uid: "",
      name: "",
      image: null,
      introduction: "",
      job: "",
      skills: [],
      wantSkills: []
    });
  }

  public get loading(): boolean {
    return this._loading.value;
  }

  public get error(): string {
    return this._error.value;
  }

  /**
   * 初始化編輯表單
   * @param uid 使用者UID
   */
  public async initializeForm() {
    this._loading.value = true;

    try {
      if (!this.userData.value) {
        throw new Error("用戶資料不存在，請重新登入");
      }

      const userData = this.userData.value as ProfileData;

      // 深拷貝保存原始數據
      this.originalData.value = JSON.parse(JSON.stringify(userData));

      // 初始化表單數據
      Object.assign(this.formData, {
        uid: userData.uid,
        name: userData.name,
        image: userData.image ?? "",
        introduction: userData.introduction ?? "",
        job: userData.job ?? "",
        skills: [...(userData.skills || [])],
        wantSkills: [...(userData.wantSkills || [])]
      });

      console.log("處理後的表單數據:", this.formData);
    } catch (error) {
      this._error.value =
        error instanceof Error ? error.message : "載入用戶數據失敗";
      console.error("初始化表單錯誤:", error);
      throw error;
    } finally {
      this._loading.value = false;
      console.log("設置 loading 為 false:", this._loading.value);
    }
  }

  /**
   * 更新用戶資料
   */
  public async updateProfile() {
    if (this._loading.value) return;

    const errorMessage = this.checkFormFields();
    if (errorMessage) {
      this._error.value = errorMessage;
      return;
    }

    try {
      this._loading.value = true;
      this._error.value = "";

      await this.userService.updateProfileData(this.formData);

      // 更新全局狀態和 localStorage
      userDataStore.updateUser(this.formData as ProfileData);

      this._bypassGuard = true;
      router.push(RouterPath.HOME.POST.MY);
    } catch (error) {
      this._error.value = "更新失敗";
      console.error("更新失敗:", error);
    } finally {
      this._loading.value = false;
    }
  }

  /**
   * 檢查表單欄位是否為空 (name, job, introduction) 各自檢查，並回傳不同錯誤訊息
   */
  public checkFormFields(): string {
    if (this.formData.name === "") return "名稱不能為空";
    if (this.formData.job === "") return "職業不能為空";
    if (this.formData.introduction === "") return "自我介紹不能為空";
    return "";
  }

  /**
   * 深度比較兩個物件是否相等
   * @param obj1 物件1
   * @param obj2 物件2
   * @returns 是否相等
   */
  private deepEqual(obj1: any, obj2: any): boolean {
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 === null ||
      obj2 === null
    ) {
      return obj1 === obj2;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  /**
   * 檢查表單是否有更改
   */
  public get hasChanges(): boolean {
    if (!this.originalData.value) return false;

    const original = {
      uid: this.originalData.value.uid,
      name: this.originalData.value.name,
      image: this.originalData.value.image,
      introduction: this.originalData.value.introduction || "",
      job: this.originalData.value.job || "",
      skills: this.originalData.value.skills || [],
      wantSkills: this.originalData.value.wantSkills || []
    };

    const currentData = {
      uid: this.formData.uid,
      name: this.formData.name,
      image: this.formData.image,
      introduction: this.formData.introduction,
      job: this.formData.job,
      skills: this.formData.skills,
      wantSkills: this.formData.wantSkills
    };

    return !this.deepEqual(original, currentData);
  }

  /**
   * 設置路由守衛
   * @param beforeLeave
   */
  public setupRouteGuard(beforeLeave: (canLeave: boolean) => void): void {
    if (this._bypassGuard) {
      beforeLeave(true);
      this._bypassGuard = false;
      return;
    }
    beforeLeave(this.canSafelyLeave());
  }

  /**
   * 檢查是否可以安全離開頁面
   */
  private canSafelyLeave(): boolean {
    if (!this.hasChanges) {
      return true;
    }
    return window.confirm("您有未保存的更改，確定要離開嗎？");
  }

  /**
   * 處理取消編輯
   */
  public handleCancel(): void {
    router.push(RouterPath.HOME.POST.MY);
  }

  /**
   * 處理圖片載入錯誤
   */
  public handleImageError(): void {
    this.imageLoadError.value = true;
  }

  /**
   * 觸發檔案選擇
   */
  public triggerFileInput(): void {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  /**
   * 處理檔案選擇
   * @param event 檔案選擇事件
   */
  public handleFileChange = async (event: Event): Promise<void> => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // 檢查檔案類型
      if (!file.type.startsWith("image/")) {
        this._error.value = "請選擇圖片檔案";
        input.value = ""; // 清空選擇
        return;
      }

      // 檢查檔案大小（5MB）
      if (file.size > 5 * 1024 * 1024) {
        this._error.value = "圖片大小不能超過 5MB";
        input.value = "";
        return;
      }

      try {
        this._loading.value = true;

        // 這裡調用檔案上傳 API
        // const imageUrl = await this.userService.uploadImage(file);
        // this.formData.image = imageUrl;
      } catch (error) {
        this._error.value = "圖片上傳失敗";
        console.error("檔案上傳失敗:", error);
      } finally {
        this._loading.value = false;
      }
    }
  };
}
