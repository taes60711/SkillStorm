import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../../services/user_service';
import EmailService from '../../services/email_service';
import type { SignUpRequestData } from '../../models/request/auth/sign_up_request_data';

export default class RegisterViewModel {
    private userService = new UserService();
    private emailService = new EmailService();
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

    constructor() {
        // 從 localStorage 獲取註冊郵箱
        const savedEmail = localStorage.getItem('registerEmail');
        if (savedEmail) {
            this.emailController.value = savedEmail;
        }
    }

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
        if (!this.emailController.value) return;

        this.loading.value = true;
        this.error.value = '';

        try {
            await this.emailService.sendCaptchaMail(this.emailController.value, "signUp");
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : '發送驗證碼失敗';
        } finally {
            this.loading.value = false;
        }
    };
} 