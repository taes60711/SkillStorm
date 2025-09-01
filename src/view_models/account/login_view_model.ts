import { ref, computed } from "vue";
import UserService from "../../services/user_service";
import type { LoginRequestData } from "../../models/request/auth/login_request_data";
import type { ProfileData } from "../../models/reponse/auth/profile_data_reponse_data";
import { RouterPath } from "../../router/router_path";
import { userDataStore } from "@/global/user_data";
import router from "@/router/router_manager";
import { EditTools } from "@/global/edit_tools";
import { GlobalData } from "@/global/global_data";
import { firebaseController } from "@/global/firebase_controller";
import type { UserCredential } from "firebase/auth";

export default class LoginViewModel {
  private userService = new UserService();
  private editTools = new EditTools();

  // 表單數據
  emailController = ref<string>("");
  pwdController = ref<string>("");

  // 錯誤狀態
  error = ref<string>("");

  // 密碼驗證計算屬性
  passwordLength = computed<boolean>(
    () => this.pwdController.value.length >= 6
  );
  hasEnglish = computed<boolean>(() =>
    /[a-zA-Z]/.test(this.pwdController.value)
  );
  hasNumber = computed<boolean>(() => /[0-9]/.test(this.pwdController.value));

  /**
   * 處理登入提交
   */
  handleLogin = async () => {
    if (!this.errCheck()) {
      return;
    }

    GlobalData.openLoadingModal();

    const loginData: LoginRequestData = {
      email: this.emailController.value,
      password: this.pwdController.value
    };

    const userData: ProfileData | string =
      await this.userService.getUserDataByEmail(loginData, "normalSign");

    if (!userData || typeof userData === "string") {
      GlobalData.closeLoadingModal();

      this.error.value = "帳號或密碼錯誤";
      return;
    }

    if (userData) {
      // 更新最後登入時間
      await this.userService.updateUserLoginLastTime(userData.uid);

      // 獲取完整用戶資料
      const completeUserData: ProfileData =
        await this.userService.getUserDataByUID(userData.uid);

      // 更新全局狀態與 localStorage
      userDataStore.setUser(completeUserData);

      GlobalData.closeLoadingModal();
      router.push(RouterPath.HOME.POST.HOME.path);
    }
  };

  /**
   * 處理 Google 登入
   */
  handleGoogleSignIn = async () => {
    const userCredential: UserCredential | undefined =
      await firebaseController.loginWithGoogle();

    if (!userCredential) {
      return;
    }

    const loginData: LoginRequestData = {
      email: userCredential?.user.email ? userCredential?.user.email : "",
      password: userCredential?.user.uid ? userCredential?.user.uid : ""
    };

    GlobalData.openLoadingModal();
    const userData: ProfileData | string =
      await this.userService.getUserDataByEmail(loginData, "googleSign");

    if (!userData || typeof userData === "string") {
      GlobalData.closeLoadingModal();
      this.error.value = "帳號或密碼錯誤";
      return;
    }

    if (userData) {
      // 更新最後登入時間
      await this.userService.updateUserLoginLastTime(userData.uid);

      // 獲取完整用戶資料
      const completeUserData: ProfileData =
        await this.userService.getUserDataByUID(userData.uid);

      // 更新全局狀態與 localStorage
      userDataStore.setUser(completeUserData);

      GlobalData.closeLoadingModal();
      router.push(RouterPath.HOME.POST.HOME.path);
    }
  };

  /**
   * 檢查是否有輸入錯誤
   * @returns true: 沒任何問題, false: 有問題
   */
  private errCheck = (): boolean => {
    this.error.value = "";

    let isOK: boolean = true;

    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !this.editTools.checkInputValid(this.emailController.value, emailRegex)
    ) {
      this.error.value = "信箱不可為空或格式不正確";
      isOK = false;
    }

    if (
      !this.hasNumber.value ||
      !this.hasEnglish.value ||
      !this.passwordLength.value
    ) {
      isOK = false;
    }

    return isOK;
  };

  /**
   *跳至 忘記密碼 頁面
   */
  toForgotPwdPage = () => {
    router.push(RouterPath.AUTH.PWDFORGOT.path);
  };

  /**
   * 跳至 註冊 頁面
   */
  toRegisterPage = () => {
    router.push(RouterPath.AUTH.REGISTER.path);
  };
}
