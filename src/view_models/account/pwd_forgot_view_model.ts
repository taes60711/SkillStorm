import { ref } from "vue";
import UserService from "../../services/user_service";
import router from "@/router/router_manager";
import { EditTools } from "@/global/edit_tools";
import { GlobalData } from "@/global/global_data";
import EmailService from "@/services/email_service";
import { ModalController } from "@/components/utilities/Modal/ModalController";
import ConfirmModal from "@/components/utilities/Modal/confirmModal.vue";
import { RouterPath } from "@/router/router_path";
/// 忘記密碼ViewModel
export default class PwdForgotViewModel {
  private userService = new UserService();
  private editTools = new EditTools();
  private emailService = new EmailService();

  codeController = ref<string>(""); /// 驗證碼
  codeIsEmpty = ref<boolean>(false); /// 驗證碼 錯誤

  emailController = ref<string>(""); /// 信箱
  emailIsEmpty = ref<boolean>(false); /// 信箱 錯誤

  pwdController = ref<string>(""); /// 密碼
  pwdIsEmpty = ref<boolean>(false); /// 密碼 錯誤

  newPwdController = ref<string>(""); /// 新密碼
  newPwdIsEmpty = ref<boolean>(false); /// 新密碼 錯誤

  modalController = new ModalController();

  /**
   * MARK: 送出按鈕
   */
  send = async (): Promise<void> => {
    GlobalData.openLoadingModal();
    if (this.emptyCheck()) {
      console.log(
        `Code: ${this.codeController.value} Email: ${this.emailController.value} Pwd: ${this.pwdController.value} newPwd: ${this.newPwdController.value}`
      );

      /// Call API
      await this.userService.updatePwd(
        this.codeController.value,
        this.emailController.value,
        this.pwdController.value
      );

      GlobalData.closeLoadingModal();

      this.modalController.show(
        ConfirmModal,
        {
          modalText: "修改成功",
          confirmFunc: () => {
            this.modalController.close();
            router.push(RouterPath.AUTH.LOGIN.path);
          }
        },
        false,
        true,
        "rgba(0, 0, 0, 0.4)",
        "logoOutSuccessModal"
      );
      console.log(`修改成功 彈回至登入頁面`);
    } else {
      console.log(
        `驗證碼為空？${this.codeIsEmpty.value} Email為空？${this.emailIsEmpty.value} Pwd為空？${this.pwdIsEmpty.value} NewPwd為空？${this.newPwdIsEmpty.value}`
      );
      GlobalData.closeLoadingModal();
    }
  };

  // 發送驗證碼
  sendEmailVerify = async (): Promise<void> => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !this.editTools.checkInputValid(this.emailController.value, emailRegex)
    ) {
      this.emailIsEmpty.value = true;
      return;
    } else {
      this.emailIsEmpty.value = false;
    }

    GlobalData.openLoadingModal();

    // 發送驗證碼
    const response: string = await this.emailService.sendCaptchaMail(
      this.emailController.value,
      "resetPwd"
    );

    if (response === "success") {
      this.modalController.show(
        ConfirmModal,
        {
          modalText: "寄送成功,請至Email查收",
          needTitile: true,
          confirmFunc: () => {
            this.modalController.close();
          }
        },
        false,
        true,
        "rgba(0, 0, 0, 0.4)",
        "sendEmailVerifyConfirmModal"
      );
    }
    GlobalData.closeLoadingModal();
  };

  /**
   * 確認是否有為空的值
   * @returns true:正常 | false:任一輸入框有空值
   */
  private emptyCheck = (): boolean => {
    let isOK: boolean = true;

    this.resetAllErr();

    /// 驗證碼
    if (!this.editTools.checkInputValid(this.codeController.value)) {
      this.codeIsEmpty.value = true;
      isOK = false;
    }

    /// 信箱
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !this.editTools.checkInputValid(this.emailController.value, emailRegex)
    ) {
      this.emailIsEmpty.value = true;
      isOK = false;
    }

    /// 密碼
    if (!this.editTools.checkInputValid(this.pwdController.value)) {
      this.pwdIsEmpty.value = true;
      isOK = false;
    }

    /// 新密碼
    if (!this.editTools.checkInputValid(this.newPwdController.value)) {
      this.newPwdIsEmpty.value = true;
      isOK = false;
    }

    return isOK;
  };

  /**
   * 重置所有錯誤
   */
  private resetAllErr() {
    this.codeIsEmpty.value = false;
    this.pwdIsEmpty.value = false;
    this.newPwdIsEmpty.value = false;
    this.emailIsEmpty.value = false;
  }

  close(): void {
    /// 確認是否有編輯過
    router.back();
  }
}
