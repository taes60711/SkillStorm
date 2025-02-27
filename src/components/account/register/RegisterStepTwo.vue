<template>
    <label for="email">名稱</label>
    <input type="text" v-model="viewModel.nameController.value">
    
    <label for="email">密碼</label>
    <input type="text" v-model="viewModel.pwdController.value">
    <div class="password-requirements">
        <div class="requirement" :class="{ 'met': viewModel.passwordLength.value }">
            <span class="x-mark">&#10005;</span>六碼以上
        </div>
        <div class="requirement" :class="{ 'met': viewModel.hasEnglish.value }">
            <span class="x-mark">&#10005;</span>含有英文
        </div>
        <div class="requirement" :class="{ 'met': viewModel.hasNumber.value }">
            <span class="x-mark">&#10005;</span>含有數字
        </div>
    </div>

    <label for="email">確認密碼</label>
    <input type="text" v-model="viewModel.confirmPwdController.value">
    <p v-if="!viewModel.passwordsMatch.value">密碼不相同</p>

    <label for="email">驗證碼</label>
    <input type="text" v-model="viewModel.captchaController.value">

    <button @click="">註冊</button>
    <button @click="viewModel.pageChange(0)">退回</button>
</template>
  
<script setup lang="ts">
 const viewModel = defineModel('RegisterViewModel');
</script>
  
<style scoped>
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
</style>
  