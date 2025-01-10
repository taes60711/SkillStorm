<script setup lang="ts">
import PwdForgotViewModel from '../../view_models/account/pwd_forgot_view_model';
import { ref } from 'vue';
  /// 創建View用的Model
  const viewModel = ref(new PwdForgotViewModel());

</script>

<template>
  <div>
    <input type="text" v-model="viewModel.codeController">
    <p>驗證碼: {{ viewModel.codeController }}</p>
    <input type="text" v-model="viewModel.pwdController">
    <p>密碼: {{ viewModel.pwdController }}</p>
    <input type="text" v-model="viewModel.newPwdController">
    <p>新密碼: {{ viewModel.newPwdController }}</p>

    <button @click="viewModel.send">送出</button>
  </div>
</template>

<style scoped>

</style>
