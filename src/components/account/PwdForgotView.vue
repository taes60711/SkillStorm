<script setup lang="ts">
import { useRouter } from 'vue-router';
import PwdForgotViewModel from '../../view_models/account/pwd_forgot_view_model';
import { ref } from 'vue';
  /// 創建View用的Model
  const viewModel = ref(new PwdForgotViewModel());

  const router = useRouter();

  /// 退出
  const backToLoginPage = () => {
    
    /// 確認是否有編輯過
    if(!viewModel.value.isEdit()){
      router.back();
    }else{
      console.log(`正在編輯中 尚未給提示彈窗`);
    }

  }

</script>

<template>
  <div>
    <input type="text" v-model="viewModel.emailController">
    <p>信箱: {{ viewModel.emailController }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.emailIsEmpty">信箱不得為空</p>
 
    <input type="text" v-model="viewModel.codeController">
    <p>驗證碼: {{ viewModel.codeController }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.codeIsEmpty">驗證碼不得為空</p>
    
    <input type="text" v-model="viewModel.pwdController">
    <p>密碼: {{ viewModel.pwdController }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.pwdIsEmpty">密碼不得為空</p>
    
    <input type="text" v-model="viewModel.newPwdController">
    <p>新密碼: {{ viewModel.newPwdController }}</p>
    <p class="pwd_forgot_err" v-if="viewModel.newPwdIsEmpty">新密碼不得為空</p>
   
    <button @click="backToLoginPage">退出</button>
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
