<template>
  <img 
    :src="AppImage.logo" 
    alt="SkillStorm" 
    class="logo" 
  />

  <div v-if = "viewModel.stepIndex.value === 0">
    <!-- 註冊輸入Email頁面 -->
    <RegisterStepOne 
      v-model:RegisterViewModel="viewModel">
    </RegisterStepOne>
  </div>
  <div v-else-if = "viewModel.stepIndex.value === 1">
    <!-- 註冊第1階段 -->
    <RegisterStepTwo 
      v-model:RegisterViewModel="viewModel">
    </RegisterStepTwo>
  </div>
</template>

<script setup lang="ts">
import { AppImage } from '@/global/app_image';
import RegisterViewModel from '../../../view_models/account/register_view_model';
import RegisterStepOne from './RegisterStepOne.vue';
import RegisterStepTwo from './RegisterStepTwo.vue';

/// 註冊頁面ViewModel
const viewModel = new RegisterViewModel();

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
