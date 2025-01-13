<template>
  <div class="register-container">
    <div class="logo-container">
      <img src="../../assets/logo.png" alt="SkillStorm" class="logo" />
      <h1 class="brand-name">SKILLSTORM</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="register-form">
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

      <button type="submit" class="register-button" @click="" :disabled="isLoading">
        開始註冊
      </button>

      <button type="button" class="google-button" @click="handleGoogleSignIn">
        <img src="../../assets/google-icon.svg" alt="Google" class="google-icon" />
        Google註冊
      </button>
    </form>

    <!-- 加載提示 -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-content">
        <div class="loading-text">{{ loadingMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterViewModel from '../../view_models/account/register_view_model';


const viewModel = new RegisterViewModel()

const handleSubmit = async () => {
  viewModel.signUpStart();
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
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.register-form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: white;
  font-size: 14px;
}

.form-group input {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: white;
}

.form-group input.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 12px;
}

.register-button {
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

.register-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-button {
  padding: 12px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
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
  text-align: center;
  color: white;
}

.loading-text {
  margin-top: 16px;
  font-size: 14px;
}
</style>
