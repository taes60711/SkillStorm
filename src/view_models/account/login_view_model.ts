import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../../services/user_service';
import type { GoogleSignInData } from '../../models/UserModel';
import { RouterManger } from '../../router/router_manager';

export default class LoginViewModel {
    private userService = new UserService();
    private router = useRouter();

    // 表單數據
    emailController = ref<string>('');
    pwdController = ref<string>('');
    
    // 錯誤狀態
    emailIsEmpty = ref<boolean>(false);
    pwdIsEmpty = ref<boolean>(false);
    
    // 加載狀態
    loading = ref<boolean>(false);
    error = ref<string>('');
    
    // 密碼顯示狀態
    showPassword = ref<boolean>(false);

    // 密碼驗證計算屬性
    passwordLength = computed(() => this.pwdController.value.length >= 6);
    hasEnglish = computed(() => /[a-zA-Z]/.test(this.pwdController.value));
    hasNumber = computed(() => /[0-9]/.test(this.pwdController.value));

    // 表單有效性
    isFormValid = computed(() => {
        return this.passwordLength.value && 
               this.hasEnglish.value && 
               this.hasNumber.value && 
               this.emailController.value !== '';
    });

    /**
     * 處理登入提交
     */
    handleSubmit = async () => {
        if (!this.isFormValid.value) return;
        
        this.loading.value = true;
        this.error.value = '';

        try {
            await this.userService.login({
                email: this.emailController.value,
                password: this.pwdController.value
            });
            this.router.push('/home');
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : '登入失敗';
        } finally {
            this.loading.value = false;
        }
    };

    /**
     * 處理 Google 登入
     */
    handleGoogleSignIn = async () => {
        this.loading.value = true;
        this.error.value = '';

        try {
            const googleData: GoogleSignInData = {
                email: this.emailController.value,
                googlePwd: this.pwdController.value
            };
            await this.userService.googleSignIn(googleData);
            this.router.push('/home');
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : 'Google 登入失敗';
        } finally {
            this.loading.value = false;
        }
    };

    /**
     * 處理忘記密碼
     */
    handleForgotPassword = () => {
        this.router.push(RouterManger.AUTH.PWDFORGOT);
    };

    /**
     * 處理註冊導航
     */
    handleRegister = () => {
        this.router.push(RouterManger.AUTH.REGISTEREMAIL);
    };

    /**
     * 重置所有錯誤
     */
    private resetAllErr() {
        this.emailIsEmpty.value = false;
        this.pwdIsEmpty.value = false;
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

        if (this.pwdController.value.replaceAll(" ", "") === "") {
            this.pwdIsEmpty.value = true;
            isOK = false;
        }

        return isOK;
    };

    /**
     * 確認是否編輯過
     */
    isEdit(): boolean {
        return this.emailController.value !== '' || this.pwdController.value !== '';
    }
} 