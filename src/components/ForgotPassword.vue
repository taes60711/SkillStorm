<template>
  <div class="forgot-password-container">
    <div class="header">
      <button class="back-button" @click="goBack">
        <span class="back-icon">&#8592;</span>
      </button>
      <h1 class="title">忘記密碼</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="forgot-password-form">
      <div class="form-group">
        <label for="email">Email</label>
        <div class="email-group">
          <input 
            type="email" 
            id="email" 
            v-model="form.email"
            :class="{ 'error': errors.email }"
          />
          <button 
            type="button" 
            class="verify-button"
            @click="sendVerificationCode"
            :disabled="!form.email || isVerificationSent"
          >
            寄送驗證碼
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="newPassword">新密碼</label>
        <input 
          type="password" 
          id="newPassword" 
          v-model="form.newPassword"
          :class="{ 'error': errors.newPassword }"
        />
      </div>

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

      <button type="submit" class="submit-button" :disabled="!isFormValid">
        送出
      </button>
    </form>

    <!-- 驗證碼發送提示 -->
    <div class="overlay" v-if="showVerificationMessage">
      <div class="message-box">
        <p>驗證碼寄送至信箱中...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  newPassword: '',
  confirmPassword: '',
  verificationCode: ''
})

const errors = ref({
  email: false,
  newPassword: false,
  confirmPassword: false,
  verificationCode: false
})

const isVerificationSent = ref(false)
const showVerificationMessage = ref(false)

// 密碼驗證計算屬性
const passwordLength = computed(() => form.value.newPassword.length >= 6)
const hasEnglish = computed(() => /[a-zA-Z]/.test(form.value.newPassword))
const hasNumber = computed(() => /[0-9]/.test(form.value.newPassword))

const isFormValid = computed(() => {
  return form.value.email && 
         passwordLength.value && 
         hasEnglish.value && 
         hasNumber.value &&
         form.value.newPassword === form.value.confirmPassword &&
         form.value.verificationCode
})

const sendVerificationCode = async () => {
  if (!form.value.email) return

  showVerificationMessage.value = true
  isVerificationSent.value = true

  try {
    // TODO: 實作發送驗證碼邏輯
    await new Promise(resolve => setTimeout(resolve, 2000))
  } finally {
    showVerificationMessage.value = false
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    if (!form.value.email) errors.value.email = true
    if (!form.value.newPassword) errors.value.newPassword = true
    if (!form.value.confirmPassword) errors.value.confirmPassword = true
    if (!form.value.verificationCode) errors.value.verificationCode = true
    return
  }

  try {
    // TODO: 實作重設密碼邏輯
    console.log('Reset password:', form.value)
    router.push('/login')
  } catch (error) {
    console.error('Reset password error:', error)
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.forgot-password-container {
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

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.email-group {
  display: flex;
  gap: 8px;
}

.email-group input {
  flex: 1;
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
  width: 100%;
}

input:focus {
  outline: none;
  border-color: #E8A87C;
}

input.error {
  border-color: #FF4444;
}

.verify-button {
  background-color: #333333;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.verify-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.password-requirements {
  display: flex;
  gap: 16px;
  margin-top: -12px;
  margin-bottom: -12px;
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

.submit-button {
  background-color: #333333;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.overlay {
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

.message-box {
  background-color: #333333;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

@media screen and (max-width: 480px) {
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

  .verify-button {
    padding: 0 12px;
    font-size: 12px;
  }

  .submit-button {
    padding: 12px;
    font-size: 14px;
  }

  .password-requirements {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
