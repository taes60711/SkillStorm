<template>
  <div class="register-container">
    <div class="logo-container">
      <img src="../../assets/logo.png" alt="SkillStorm" class="logo" />
      <h1 class="brand-name">SKILLSTORM</h1>
    </div>
    
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
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import RegisterViewModel from '../../view_models/account/register_view_model'



const viewModel = new RegisterViewModel()



/**
 * 暫時
 */
const route = useRoute()
const email = route.query.email;
if(typeof email === "string"){
  viewModel.emailController.value = email;
  console.log(viewModel.emailController.value)
}

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
  handleSubmit,
} = viewModel
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
</style>
