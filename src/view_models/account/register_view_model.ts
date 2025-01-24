import { ref, computed } from 'vue';
import UserService from '../../services/user_service';
import EmailService from '../../services/email_service';
import type { SignUpRequestData } from '../../models/request/auth/sign_up_request_data';
import { RouterPath } from '../../router/router_path';
import router from '@/router/router_manager';

export default class RegisterViewModel {
    private userService = new UserService();
    private emailService = new EmailService();

    // 表單數據
    emailController = ref<string>('');
    nameController = ref<string>('');
    pwdController = ref<string>('');
    confirmPwdController = ref<string>('');
    captchaController = ref<string>('');

    // 錯誤狀態
    emailIsEmpty = ref<boolean>(false);
    nameIsEmpty = ref<boolean>(false);
    pwdIsEmpty = ref<boolean>(false);
    confirmPwdIsEmpty = ref<boolean>(false);
    captchaIsEmpty = ref<boolean>(false);
    emailError = ref<boolean>(false);

    // 加載狀態
    loading = ref<boolean>(false);
    isLoading = ref<boolean>(false);
    loadingMessage = ref<string>('處理中...');
    error = ref<string>('');

    // 密碼顯示狀態
    showPassword = ref<boolean>(false);
    showConfirmPassword = ref<boolean>(false);

    // 密碼驗證計算屬性
    passwordLength = computed(() => this.pwdController.value.length >= 6);
    hasEnglish = computed(() => /[a-zA-Z]/.test(this.pwdController.value));
    hasNumber = computed(() => /[0-9]/.test(this.pwdController.value));
    passwordsMatch = computed(() => this.pwdController.value === this.confirmPwdController.value);

    // 表單有效性
    isFormValid = computed(() => {
        return this.passwordLength.value &&
            this.hasEnglish.value &&
            this.hasNumber.value &&
            this.passwordsMatch.value &&
            this.emailController.value !== '' &&
            this.nameController.value !== '' &&
            this.captchaController.value !== '';
    });

    /**
     * 處理註冊提交
     */
    handleSubmit = async () => {
        if (!this.isFormValid.value) return;

        this.loading.value = true;
        this.error.value = '';

        try {
            const signUpData: SignUpRequestData = {
                email: this.emailController.value,
                password: this.pwdController.value,
                name: this.nameController.value
            };

            await this.userService.signUp(this.captchaController.value, signUpData);
            router.push(RouterPath.AUTH.LOGIN);
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : '註冊失敗';
        } finally {
            this.loading.value = false;
        }
    };

    signUpStart = async () => {
        this.isLoading.value = true;
        this.loadingMessage.value = '發送驗證碼中...';
        
        try {
            const result = await this.sendVerificationCode();
            if (result === "success") {
                return true;
            }
            return false;
        } catch (err) {
            this.emailError.value = true;
            this.error.value = err instanceof Error ? err.message : '發送驗證碼失敗';
            return false;
        } finally {
            this.isLoading.value = false;
        }
    }

    /**
     * 發送驗證碼
     */
    sendVerificationCode = async () => {
        if (!this.emailController.value) return;

        this.loading.value = true;
        this.error.value = '';

        try {
            const response = await this.emailService.sendCaptchaMail(this.emailController.value, "signUp");
            if (response === "emailExist") {
                this.emailError.value = true;
                this.error.value = "此信箱已被註冊";
                return "emailExist";
            }
            return response;
        } catch (err) {
            this.emailError.value = true;
            this.error.value = err instanceof Error ? err.message : '發送驗證碼失敗';
            throw err;
        } finally {
            this.loading.value = false;
        }
    };

    /**
     * 處理 Google 註冊
     */
    handleGoogleSignIn = async () => {
        this.isLoading.value = true;
        this.loadingMessage.value = '正在處理 Google 註冊...';
        
        try {
            // TODO: 實現 Google 註冊邏輯
            console.log('Google 註冊功能待實現');
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : 'Google 註冊失敗';
        } finally {
            this.isLoading.value = false;
        }
    };
} 