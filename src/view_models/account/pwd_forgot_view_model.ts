import { ref } from "vue";


/// 忘記密碼ViewModel
export default class PwdForgotViewModel {
    codeController = ref<string>(''); /// 驗證碼
    codeIsEmpty = ref<boolean>(false); /// 驗證碼 錯誤

    emailController = ref<string>(''); /// 信箱
    emailIsEmpty = ref<boolean>(false);  /// 信箱 錯誤

    pwdController = ref<string>(''); /// 密碼
    pwdIsEmpty = ref<boolean>(false);  /// 密碼 錯誤

    newPwdController = ref<string>(''); /// 新密碼
    newPwdIsEmpty = ref<boolean>(false);  /// 新密碼 錯誤

    /**
     * MARK: 送出按鈕
     */
    send = () => {
        if (this.emptyCheck()) {
            console.log(
                `Code: ${this.codeController.value} Email: ${this.emailController.value} Pwd: ${this.pwdController.value} newPwd: ${this.newPwdController.value}`
            );
        } else {
            console.log(
                `驗證碼為空？${this.codeIsEmpty.value} Email為空？${this.emailIsEmpty.value} Pwd為空？${this.pwdIsEmpty.value} NewPwd為空？${this.newPwdIsEmpty.value}`
            );
        }
    };

    /**
     * 確認是否有為空的值
     * @returns true:正常 | false:任一輸入框有空值
     */
    private emptyCheck = (): boolean => {
        let isOK: boolean = true;

        this.resetAllErr();

        /// 驗證碼
        if (this.codeController.value.replaceAll(" ", "") === "") {
            this.codeIsEmpty.value = true;
            isOK = false;
        }

        /// 信箱
        if (this.emailController.value.replaceAll(" ", "") === "") {
            this.emailIsEmpty.value = true;
            isOK = false;
        }

        /// 密碼
        if (this.pwdController.value.replaceAll(" ", "") === "") {
            this.pwdIsEmpty.value = true;
            isOK = false;
        }

        /// 新密碼
        if (this.newPwdController.value.replaceAll(" ", "") === "") {
            this.newPwdIsEmpty.value = true;
            isOK = false;
        }
        return isOK;
    }

    /**
     * 重置所有錯誤
     */
    private resetAllErr() {
        this.codeIsEmpty.value = false;
        this.pwdIsEmpty.value = false;
        this.newPwdIsEmpty.value = false;
        this.emailIsEmpty.value = false;
    }

    /**
    * 確認是否編輯過
    * @returns true:有編輯過 | false:正常
    */
    isEdit(): boolean {
        let isEdit: boolean = false;
        if (this.codeController.value != "" || this.emailController.value != ""
            || this.pwdController.value != "" || this.newPwdController.value != "") {

            isEdit = true;
        }

        return isEdit;
    }

}
