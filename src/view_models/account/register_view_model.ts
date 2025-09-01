import { ref, computed } from "vue";
import UserService from "../../services/user_service";
import EmailService from "../../services/email_service";
import type { SignUpRequestData } from "../../models/request/auth/sign_up_request_data";
import { RouterPath } from "../../router/router_path";
import router from "@/router/router_manager";
import { EditTools } from "@/global/edit_tools";
import { GlobalData } from "@/global/global_data";
import { firebaseController } from "@/global/firebase_controller";
import type { UserCredential } from "firebase/auth";

export default class RegisterViewModel {
  stepIndex = ref<number>(0);

  private userService = new UserService();
  private emailService = new EmailService();
  private editTools = new EditTools();

  // 輸入框
  emailController = ref<string>("");

  nameController = ref<string>("");
  pwdController = ref<string>("");
  confirmPwdController = ref<string>("");
  captchaController = ref<string>("");

  // 錯誤狀態
  emailError = ref<string>("");

  nameError = ref<string>("");
  captchaError = ref<string>("");

  passwordLength = computed<boolean>(
    () => this.pwdController.value.length >= 6
  );
  hasEnglish = computed<boolean>(() =>
    /[a-zA-Z]/.test(this.pwdController.value)
  );
  hasNumber = computed<boolean>(() => /[0-9]/.test(this.pwdController.value));
  passwordsMatch = computed<boolean>(
    () => this.pwdController.value === this.confirmPwdController.value
  );

  /**
   * 處理註冊提交
   */
  signUp = async () => {
    this.errReset();
    if (this.errCheck()) {
      const signUpData: SignUpRequestData = {
        email: this.emailController.value,
        password: this.pwdController.value,
        name: this.nameController.value
      };

      GlobalData.openLoadingModal();
      // 註冊提交
      await this.userService.signUp(this.captchaController.value, signUpData);
      GlobalData.closeLoadingModal();

      router.push(RouterPath.AUTH.LOGIN);
    }
  };

  /**
   * 普通註冊: 開始
   */
  signUpStart = async () => {
    this.errReset();

    if (this.errCheck()) {
      GlobalData.openLoadingModal();
      // 發送驗證碼
      const response: string = await this.emailService.sendCaptchaMail(
        this.emailController.value,
        "signUp"
      );
      GlobalData.closeLoadingModal();
      if (response === "success") {
        this.pageChange(1);
      } else if (response === "emailExist") {
        this.emailError.value = "信箱已經註冊過";
        console.log("emailExist");
      }
    }
  };

  /**
   * 處理 Google 註冊
   */
  googleSignIn = async () => {
    const userCredential: UserCredential | undefined =
      await firebaseController.loginWithGoogle();

    if (!userCredential) {
      return;
    }

    const signUpData: SignUpRequestData = {
      email: userCredential?.user.email ? userCredential?.user.email : "",
      password: userCredential?.user.uid ? userCredential?.user.uid : "",
      name: userCredential?.user.uid ? userCredential?.user.uid : ""
    };

    GlobalData.openLoadingModal();
    // Google註冊提交
    await this.userService.signUp(this.captchaController.value, signUpData);
    GlobalData.closeLoadingModal();
  };

  /**
   * 檢查是否有輸入錯誤
   * @returns true: 沒任何問題, false: 有問題
   */
  private errCheck = (): boolean => {
    let isOK: boolean = true;
    switch (this.stepIndex.value) {
      case 0:
        const emailRegex: RegExp =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (
          !this.editTools.checkInputValid(
            this.emailController.value,
            emailRegex
          )
        ) {
          this.emailError.value = "信箱不可為空或格式不正確";
          isOK = false;
        }

        break;
      case 1:
        if (!this.editTools.checkInputValid(this.nameController.value)) {
          this.nameError.value = "名稱不可為空";
          isOK = false;
        }
        if (!this.editTools.checkInputValid(this.captchaController.value)) {
          this.captchaController.value = "驗證碼不可為空";
          isOK = false;
        }

        if (
          !this.hasNumber.value ||
          !this.hasEnglish.value ||
          !this.passwordsMatch.value ||
          !this.passwordLength.value
        ) {
          isOK = false;
        }

        break;
    }

    return isOK;
  };

  /**
   * 重置所有錯誤訊息
   */
  private errReset = () => {
    this.emailError.value = "";
    this.nameError.value = "";
    this.captchaError.value = "";
  };

  /**
   * 切換註冊頁面
   * @param toIndex 要跳轉的頁面
   */
  private pageChange = (toIndex: number) => {
    this.stepIndex.value = toIndex;
  };

  /**
   * 跳至 登入 頁面
   */
  toLoginPage = () => {
    router.push(RouterPath.AUTH.LOGIN.path);
  };
}
