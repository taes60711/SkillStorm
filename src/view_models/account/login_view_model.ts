import { ref, computed } from 'vue';
import UserService from '../../services/user_service';
import type { LoginRequestData } from '../../models/request/auth/login_request_data';
import type { ProfileData } from '../../models/reponse/auth/profile_data_reponse_data';
import { RouterPath } from '../../router/router_path';
import { userDataStore } from "@/global/user_data";
import router from '@/router/router_manager';

export default class LoginViewModel {
    private userService = new UserService();
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
            const loginData: LoginRequestData = {
                email: this.emailController.value,
                password: this.pwdController.value
            };

            const userData: ProfileData = await this.userService.getUserDataByEmail(loginData, "normalSign");
            if (userData) {
                // 更新最後登入時間
                await this.userService.updateUserLoginLastTime(userData.uid);

                // 獲取完整用戶資料
                const completeUserData: ProfileData = await this.userService.getUserDataByUID(userData.uid);
                // 更新全局狀態與 localStorage
                userDataStore.setUser(completeUserData);

                router.push(RouterPath.HOME.PROFILE.INDEX);
            } else {
                throw new Error('登入失敗');
            }
        } catch (err) {
            this.error.value = err instanceof Error ? err.message : '登入失敗';
        } finally {
            this.loading.value = false;
        }
    }

    /**
     * 處理 Google 登入
     */
    handleGoogleSignIn = async () => {
        // this.loading.value = true;
        // this.error.value = '';

        // try {
        //     const userData = await this.userService.googleSignIn({
        //         email: this.emailController.value,
        //         googlePwd: ''  // 這個值會由 Google OAuth 提供
        //     });
        //     if (userData) {
        //         this.router.push('/home');
        //     }
        // } catch (err) {
        //     this.error.value = err instanceof Error ? err.message : 'Google 登入失敗';
        // } finally {
        //     this.loading.value = false;
        // }
    }

    /**
     * 處理忘記密碼
     */
    handleForgotPassword = () => {
        router.push(RouterPath.AUTH.PWDFORGOT);
    }

    /**
     * 處理註冊
     */
    handleRegister = () => {
        router.push(RouterPath.AUTH.REGISTEREMAIL);
    }
} 