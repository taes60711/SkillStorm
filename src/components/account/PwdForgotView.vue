<script setup lang="ts">
import PwdForgotViewModel from '../../view_models/account/pwd_forgot_view_model';

 /// 創建View用的Model
 const viewModel = new PwdForgotViewModel();


</script>

<template>
  <div>
    <input type="text" v-model="viewModel.emailController.value">
    <p>信箱: {{ viewModel.emailController.value }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.emailIsEmpty.value">信箱不得為空</p>
 
    <input type="text" v-model="viewModel.codeController.value">
    <p>驗證碼: {{ viewModel.codeController.value }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.codeIsEmpty.value">驗證碼不得為空</p>
    
    <input type="text" v-model="viewModel.pwdController.value">
    <p>密碼: {{ viewModel.pwdController.value }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.pwdIsEmpty.value">密碼不得為空</p>
    
    <input type="text" v-model="viewModel.newPwdController.value">
    <p>新密碼: {{ viewModel.newPwdController }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.newPwdIsEmpty.value">新密碼不得為空</p>
   
    <button @click="viewModel.close">退出</button>
    <button @click="viewModel.send">送出</button>
   
  </div>
</template>

<style scoped>
  p{
    color: #FFFFFF;
  }

  .pwd_forgot_err{
    color: #f90202;
  }
</style>
