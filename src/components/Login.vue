<template>
  <div class="login-container">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="SkillStorm" class="logo" />
      <h1 class="brand-name">SKILLSTORM</h1>
    </div>
    
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email"
          :class="{ 'error': errors.email }"
        />
      </div>

      <div class="form-group">
        <label for="password">密碼</label>
        <input 
          :type="showPassword ? 'text' : 'password'"
          id="password" 
          v-model="form.password"
          :class="{ 'error': errors.password }"
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

      <div class="forgot-password">
        <a href="#" @click.prevent="handleForgotPassword">忘記密碼？</a>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>
      <button type="submit" class="login-button" :disabled="!isFormValid || loading">
        {{ loading ? '登入中...' : '登入' }}
      </button>

      <button type="button" class="google-button" @click="handleGoogleSignIn">
        <img src="../assets/google-icon.svg" alt="Google" class="google-icon" />
        Google登入
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import type { GoogleSignInData } from '../services/AuthService'

const router = useRouter()
const { login, googleSignIn, loading, error } = useAuth()

const showPassword: Ref<boolean> = ref(false)
const form: Ref<{
  email: string
  password: string
}> = ref({
  email: '',
  password: ''
})

const errors: Ref<{
  email: boolean
  password: boolean
}> = ref({
  email: false,
  password: false
})

// 密碼驗證計算屬性
const passwordLength: ComputedRef<boolean> = computed(() => form.value.password.length >= 6)
const hasEnglish: ComputedRef<boolean> = computed(() => /[a-zA-Z]/.test(form.value.password))
const hasNumber: ComputedRef<boolean> = computed(() => /[0-9]/.test(form.value.password))

const isFormValid: ComputedRef<boolean> = computed(() => {
  return passwordLength.value && 
         hasEnglish.value && 
         hasNumber.value && 
         form.value.email !== ''
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  const success = await login({
    email: form.value.email,
    password: form.value.password
  })
  
  if (success) {
    router.push('/home')
  }
}

const handleGoogleSignIn = async () => {
  const googleData: GoogleSignInData = {
    email: form.value.email,
    googlePwd: form.value.password
  }
  const success = await googleSignIn(googleData)
  if (success) {
    router.push('/home')
  }
}

const handleForgotPassword = () => {
  router.push('/forgot-password')
}
</script>

<style scoped>
.login-container {
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

.login-form {
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

.password-requirements {
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

.forgot-password {
  text-align: right;
}

.forgot-password a {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 12px;
}

button {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.login-button {
  background-color: #333333;
  color: #FFFFFF;
}

.login-button:disabled,
.google-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-button {
  background-color: #FFFFFF;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.error-message {
  color: #ff4d4f;
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  text-align: center;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

@media screen and (max-width: 480px) {
  .logo {
    width: 64px;
    height: 64px;
  }

  .brand-name {
    font-size: 20px;
  }

  .password-requirements {
    flex-direction: column;
    gap: 8px;
  }

  input {
    padding: 10px;
    font-size: 14px;
  }

  button {
    padding: 12px;
    font-size: 14px;
  }
}
</style>
