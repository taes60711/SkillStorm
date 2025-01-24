<template>
  <div class="register-container">
    <div class="logo-container">
      <img src="../../assets/logo.png" alt="SkillStorm" class="logo" />
      <h1 class="brand-name">SKILLSTORM</h1>
    </div>
    
    <!-- 第一步：郵箱註冊 -->
    <div v-if="registerState.currentStep.value === 1">
      <form @submit.prevent="handleEmailSubmit" class="register-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="viewModel.emailController.value"
            required
            :class="{ 'error': emailError }"
          />
          <span v-if="emailError" class="error-message">{{ error }}</span>
        </div>

        <button type="submit" class="register-button" :disabled="isLoading">
          開始註冊
        </button>

        <button type="button" class="google-button" @click="handleGoogleSignIn">
          <img src="../../assets/google-icon.svg" alt="Google" class="google-icon" />
          Google註冊
        </button>
      </form>
    </div>

    <!-- 第二步：完整註冊資料 -->
    <div v-else-if="registerState.currentStep.value === 2">
      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-group">
          <label for="name">名稱</label>
          <input 
            type="text" 
            id="name" 
            v-model="nameController"
            :class="{ 'error': nameIsEmpty }"
          />
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <input 
            :type="showPassword ? 'text' : 'password'"
            id="password" 
            v-model="pwdController"
            :class="{ 'error': pwdIsEmpty }"
          />
          <div class="password-requirements">
            <div class="requirement" :class="{ 'met': passwordLength }">
              <span class="x-mark">&#10005;</span>六碼以上
            </div>
            <div class="requirement" :class="{ 'met': hasEnglish }">
              <span class="x-mark">&#10005;</span>含有英文
            </div>
            <div class="requirement" :class="{ 'met': hasNumber }">
              <span class="x-mark">&#10005;</span>含有數字
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">確認密碼</label>
          <input 
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword" 
            v-model="confirmPwdController"
            :class="{ 'error': confirmPwdIsEmpty }"
          />
          <div class="password-match" v-if="confirmPwdController">
            <div class="requirement" :class="{ 'met': passwordsMatch }">
              <span class="x-mark">&#10005;</span>密碼相符
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="captcha">驗證碼</label>
          <input 
            type="text" 
            id="captcha" 
            v-model="captchaController"
            :class="{ 'error': captchaIsEmpty }"
          />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>
        <button type="submit" class="register-button" :disabled="!isFormValid || loading">
          {{ loading ? '註冊中...' : '註冊' }}
        </button>
      </form>
    </div>

    <!-- 加載提示 -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-content">
        <div class="loading-text">{{ loadingMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import RegisterViewModel from '../../view_models/account/register_view_model';
import { registerState } from '@/global/register_state';
import router from '@/router/router_manager';
import { RouterPath } from '@/router/router_path';

const viewModel = new RegisterViewModel();

onMounted(() => {
  // 初始化註冊步驟
  registerState.setStep(1);
});

// 處理郵箱提交
const handleEmailSubmit = async () => {
  try {
    const success = await viewModel.signUpStart();
    if (success) {
      registerState.setEmail(viewModel.emailController.value);
      registerState.setStep(2);
    }
  } catch (error) {
    console.error('註冊失敗:', error);
  }
}

// 處理註冊提交
const handleSubmit = async () => {
  if (!viewModel.isFormValid.value) return;

  viewModel.loading.value = true;
  viewModel.error.value = '';

  try {
    const signUpData = {
      email: viewModel.emailController.value,
      password: viewModel.pwdController.value,
      name: viewModel.nameController.value
    };

    await viewModel.userService.signUp(viewModel.captchaController.value, signUpData);
    router.push(RouterPath.AUTH.LOGIN);
  } catch (err) {
    viewModel.error.value = err instanceof Error ? err.message : '註冊失敗';
  } finally {
    viewModel.loading.value = false;
  }
};

// 導出需要的屬性和方法
const {
  nameController,
  pwdController,
  confirmPwdController,
  captchaController,
  nameIsEmpty,
  pwdIsEmpty,
  confirmPwdIsEmpty,
  captchaIsEmpty,
  loading,
  error,
  showPassword,
  showConfirmPassword,
  passwordLength,
  hasEnglish,
  hasNumber,
  passwordsMatch,
  isFormValid,
  isLoading,
  loadingMessage,
  emailError,
  handleGoogleSignIn
} = viewModel;
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background-color: #000000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.brand-name {
  color: #FFFFFF;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.register-form {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group {
  display: flex;
  gap: 8px;
}

.input-group input {
  flex: 1;
}

.input-group button {
  padding: 0 16px;
  background-color: #333333;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.input-group button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

label {
  color: #FFFFFF;
  font-size: 14px;
}

input {
  background-color: transparent;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 12px;
  color: #FFFFFF;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #E8A87C;
}

input.error {
  border-color: #FF4444;
}

.password-requirements,
.password-match {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.requirement {
  color: #666666;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.requirement.met {
  color: #4A90E2;
}

.requirement.met .x-mark {
  color: #4A90E2;
}

.x-mark {
  font-size: 10px;
  color: #666666;
}

.error-message {
  color: #FF4444;
  font-size: 14px;
  text-align: center;
}

.register-button {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background-color: #333333;
  color: #FFFFFF;
}

.register-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-content {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.loading-text {
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.google-button {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background-color: #FFFFFF;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.google-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-icon {
  width: 20px;
  height: 20px;
}
</style>
