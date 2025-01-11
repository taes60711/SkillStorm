import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../../services/user_service';
import type { RegisterData } from '../../models/UserModel';

export default class RegisterViewModel {
    private userService = new UserService();
    private router = useRouter();

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
    
    // 加載狀態
    loading = ref<boolean>(false);
    error = ref<string>('');
    
    // 密碼顯示狀態
    showPassword = ref<boolean>(false);
    showConfirmPassword = ref<boolean>(false);

    // 密碼驗證計算屬性
    passwordLength = computed(() => this.pwdController.value.length >= 6);
    hasEnglish = computed(() => /[a-zA-Z]/.test(this.pwdController.value));
    hasNumber = computed(() => /[0-9]/.test(this.pwdController.value));
    passwordsMatch = computed(() => 
        this.pwdController.value === this.confirmPwdController.value && 
        this.pwdController.value !== ''
    );

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
        if (!this.isFormValid.value || !this.emptyCheck()) return;
        
        this.loading.value = true;
        this.error.value = '';

        try {
            const userData: RegisterData = {
                email: this.emailController.value,
                name: this.nameController.value,
                password: this.pwdController.value,
                isEmailVerified: false
            };

            await this.userService.register(userData, this.captchaController.value);
            this.router.push('/login');
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : '註冊失敗';
        } finally {
            this.loading.value = false;
        }
    };

    /**
     * 發送驗證碼
     */
    sendVerificationCode = async () => {
        if (!this.emailController.value) {
            this.emailIsEmpty.value = true;
            return;
        }

        this.loading.value = true;
        this.error.value = '';

        try {
            await this.userService.sendVerificationCode(this.emailController.value, 'signUp');
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : '發送驗證碼失敗';
        } finally {
            this.loading.value = false;
        }
    };

    /**
     * 重置所有錯誤
     */
    private resetAllErr() {
        this.emailIsEmpty.value = false;
        this.nameIsEmpty.value = false;
        this.pwdIsEmpty.value = false;
        this.confirmPwdIsEmpty.value = false;
        this.captchaIsEmpty.value = false;
        this.error.value = '';
    }

    /**
     * 確認是否有為空的值
     */
    private emptyCheck = (): boolean => {
        let isOK = true;
        this.resetAllErr();

        if (this.emailController.value.replaceAll(" ", "") === "") {
            this.emailIsEmpty.value = true;
            isOK = false;
        }

        if (this.nameController.value.replaceAll(" ", "") === "") {
            this.nameIsEmpty.value = true;
            isOK = false;
        }

        if (this.pwdController.value.replaceAll(" ", "") === "") {
            this.pwdIsEmpty.value = true;
            isOK = false;
        }

        if (this.confirmPwdController.value.replaceAll(" ", "") === "") {
            this.confirmPwdIsEmpty.value = true;
            isOK = false;
        }

        if (this.captchaController.value.replaceAll(" ", "") === "") {
            this.captchaIsEmpty.value = true;
            isOK = false;
        }

        return isOK;
    };

    /**
     * 確認是否編輯過
     */
    isEdit(): boolean {
        return this.emailController.value !== '' || 
               this.nameController.value !== '' || 
               this.pwdController.value !== '' ||
               this.confirmPwdController.value !== '' ||
               this.captchaController.value !== '';
    }
} 