<template>
  <div class="welcome-container">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="SkillStorm" class="logo" />
      <h1 class="brand-name">SKILLSTORM</h1>
    </div>
    <div class="button-container">
      <button class="login-button" @click="goToLogin">登入</button>
      <button class="register-button" @click="goToRegister">註冊</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register/email')
}
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  padding: 20px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
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

.button-container {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
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

.register-button {
  background-color: #E8A87C;
  color: #000000;
}

/* 手機版樣式 */
@media screen and (max-width: 480px) {
  .welcome-container {
    padding: 16px;
  }

  .logo {
    width: 64px;
    height: 64px;
    margin-bottom: 12px;
  }

  .brand-name {
    font-size: 20px;
  }

  .button-container {
    padding: 0 16px;
    gap: 10px;
  }

  button {
    padding: 12px;
    font-size: 14px;
  }
}

/* 確保在 iPhone 等設備上不會有奇怪的縮放 */
@media screen and (max-width: 380px) {
  .welcome-container {
    padding: 12px;
  }

  .button-container {
    padding: 0 12px;
  }
}

/* 處理超高螢幕（像 iPhone 12 Pro Max 等） */
@media screen and (min-height: 800px) and (max-width: 480px) {
  .logo-container {
    margin-bottom: 60px;
  }
}
</style>
