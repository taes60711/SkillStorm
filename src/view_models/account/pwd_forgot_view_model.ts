import { ref } from "vue";


/// 忘記密碼ViewModel
export default class PwdForgotViewModel {
    codeController = ref<string>(''); /// 驗證碼
    pwdController = ref<string>(''); /// 密碼
    newPwdController = ref<string>(''); /// 新密碼

    codeIsEmpty: boolean = false;
    pwdIsEmpty: boolean = false;
    newPwdIsEmpty: boolean = false;

    /**
     * MARK: 送出按鈕
     */
    send = () => {
        if (this.emptyCheck()) {
            console.log(
                `Code: ${this.codeController.value} Pwd: ${this.pwdController.value} newPwd: ${this.newPwdController.value}`
            );
        } else {
            console.log(
                `驗證碼為空？${this.codeIsEmpty} Pwd為空？${this.pwdIsEmpty} NewPwd為空？${this.newPwdIsEmpty}`
            );
        }
    };

    /**
     * 確認是否有為空的值
     * @returns true:正常 | false:任一輸入框有空值
     */
    private emptyCheck = (): boolean => {
        let isOK: boolean = true;

        /// 驗證碼
        if (this.codeController.value.replaceAll(" ", "") === "") {
            this.codeIsEmpty = true;
            isOK = false;
        }

        /// 密碼
        if (this.pwdController.value.replaceAll(" ", "") === "") {
            this.pwdIsEmpty = true;
            isOK = false;
        }

        /// 新密碼
        if (this.newPwdController.value.replaceAll(" ", "") === "") {
            this.newPwdIsEmpty = true;
            isOK = false;
        }
        return isOK;
    }
}
