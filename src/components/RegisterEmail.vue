<template>
  <div class="register-container">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="SkillStorm" class="logo" />
      <h1 class="brand-name">SKILLSTORM</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email"
          required
          :class="{ 'error': emailError }"
        />
      </div>

      <button type="submit" class="register-button" :disabled="isLoading">
        開始註冊
      </button>

      <button type="button" class="google-button" @click="handleGoogleSignIn">
        <img src="../assets/google-icon.svg" alt="Google" class="google-icon" />
        Google註冊
      </button>
    </form>

    <!-- 加載提示 -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-content">
        <div class="loading-text">驗證碼寄送至信箱中...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const emailError = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!email.value) {
    emailError.value = true
    return
  }

  isLoading.value = true
  
  try {
    // 模擬 API 請求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 儲存 email 到 localStorage 或 vuex/pinia
    localStorage.setItem('registerEmail', email.value)
    
    // 導航到下一步
    router.push('/register/info')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleGoogleSignIn = () => {
  // 處理 Google 註冊邏輯
  console.log('Google sign in clicked')
}
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

button {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.register-button {
  background-color: #333333;
  color: #FFFFFF;
}

.register-button:disabled {
  opacity: 0.5;
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-content {
  background-color: #333333;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.loading-text {
  color: #FFFFFF;
  font-size: 14px;
}

@media screen and (max-width: 480px) {
  .logo {
    width: 64px;
    height: 64px;
  }

  .brand-name {
    font-size: 20px;
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
