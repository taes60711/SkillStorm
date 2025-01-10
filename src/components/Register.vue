<template>
  <div class="register-container">
    <div class="header">
      <button class="back-button" @click="goBack">
        <span class="back-icon">&#8592;</span>
      </button>
      <h1 class="title">註冊(1/2)</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="name">名稱</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name"
          :class="{ 'error': errors.name }"
        />
      </div>

      <div class="form-group">
        <label for="password">密碼</label>
        <input 
          type="password" 
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

      <div class="form-group">
        <label for="confirmPassword">確認密碼</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="form.confirmPassword"
          :class="{ 'error': errors.confirmPassword }"
        />
      </div>

      <div class="form-group">
        <label for="verificationCode">驗證碼</label>
        <input 
          type="text" 
          id="verificationCode" 
          v-model="form.verificationCode"
          :class="{ 'error': errors.verificationCode }"
        />
      </div>

      <button type="submit" class="next-button" :disabled="!isFormValid || loading">
        下一步
      </button>
    </form>

    <div v-if="error" class="error-message">{{ error }}</div>

    <!-- 加載提示 -->
    <div class="loading-overlay" v-if="loading">
      <div class="loading-content">
        <div class="loading-text">處理中...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register, loading, error } = useAuth()

const form: Ref<{
  name: string
  password: string
  confirmPassword: string
  verificationCode: string
  email: string
}> = ref({
  name: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  email: ''
})

const errors: Ref<{
  name: boolean
  password: boolean
  confirmPassword: boolean
  verificationCode: boolean
}> = ref({
  name: false,
  password: false,
  confirmPassword: false,
  verificationCode: false
})

// 密碼驗證計算屬性
const passwordLength: ComputedRef<boolean> = computed(() => form.value.password.length >= 6)
const hasEnglish: ComputedRef<boolean> = computed(() => /[a-zA-Z]/.test(form.value.password))
const hasNumber: ComputedRef<boolean> = computed(() => /[0-9]/.test(form.value.password))

const isFormValid: ComputedRef<boolean> = computed(() => {
  return passwordLength.value && 
         hasEnglish.value && 
         hasNumber.value && 
         form.value.password === form.value.confirmPassword &&
         form.value.name !== '' &&
         form.value.verificationCode !== ''
})

onMounted(() => {
  // 從localStorage獲取email
  const email = localStorage.getItem('registerEmail')
  if (!email) {
    router.push('/register-email')
    return
  }
  form.value.email = email
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  const success = await register({
    email: form.value.email,
    name: form.value.name,
    password: form.value.password,
    isEmailVerified: false
  }, form.value.verificationCode)

  if (success) {
    // 清除localStorage中的email
    localStorage.removeItem('registerEmail')
    // 導航到登入頁面
    router.push('/login')
  }
}

const goBack = () => {
  router.push('/register-email')
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background-color: #000000;
  padding: 20px;
  color: #FFFFFF;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

.back-button {
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  position: absolute;
  left: 0;
}

.back-icon {
  display: inline-block;
  transform: translateY(-2px);
}

.title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: normal;
}

.register-form {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
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
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 12px;
  color: #FFFFFF;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #E8A87C;
}

input.error {
  border-color: #FF4444;
}

.password-requirements {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.requirement {
  color: #FF4444;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.requirement.met {
  color: #00FF00;
}

.x-mark {
  font-size: 10px;
}

.next-button {
  padding: 12px;
  background-color: #333333;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
}

.next-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #FF4444;
  font-size: 12px;
  text-align: center;
  margin-top: 16px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-text {
  font-size: 16px;
  font-weight: 500;
}

@media screen and (max-width: 480px) {
  .register-container {
    padding: 16px;
  }

  .header {
    margin-bottom: 30px;
  }

  .title {
    font-size: 16px;
  }

  input {
    padding: 10px;
    font-size: 14px;
  }

  .next-button {
    padding: 12px;
    font-size: 14px;
  }

  .password-requirements {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
