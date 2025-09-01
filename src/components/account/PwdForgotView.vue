<script setup lang="ts">
import PwdForgotViewModel from "../../view_models/account/pwd_forgot_view_model";
import MainButton from "@/components/utilities/MainButton.vue";
import { AppImage } from "@/global/app_image";
/// 創建View用的Model
const viewModel = new PwdForgotViewModel();
</script>

<template>
  <div class="loginContainer">
    <img :src="AppImage.logo" alt="SkillStorm" class="logo" />

    <div class="loginInputContainer">
      <div class="pwdForgotTitle">忘記密碼</div>
      <input
        type="text"
        placeholder="Email"
        v-model="viewModel.emailController.value"
        class="textInput marginB"
      />

      <p class="pwd_forgot_err" v-if="viewModel.emailIsEmpty.value">
        信箱不可為空或格式不正確
      </p>

      <input
        type="text"
        v-model="viewModel.codeController.value"
        placeholder="驗證碼"
        class="textInput marginB"
      />

      <p class="pwd_forgot_err" v-if="viewModel.codeIsEmpty.value">
        驗證碼不得為空
      </p>

      <input
        type="password"
        v-model="viewModel.pwdController.value"
        placeholder="密碼"
        class="textInput marginB"
      />

      <p class="pwd_forgot_err" v-if="viewModel.pwdIsEmpty.value">
        密碼不得為空
      </p>

      <input
        type="password"
        v-model="viewModel.newPwdController.value"
        placeholder="新密碼"
        class="textInput marginB"
      />

      <p class="pwd_forgot_err marginB" v-if="viewModel.newPwdIsEmpty.value">
        新密碼不得為空
      </p>

      <MainButton
        :onPress="
          () => {
            viewModel.send();
          }
        "
        text="送出"
        class="marginB"
      ></MainButton>

      <MainButton
        :onPress="
          () => {
            viewModel.close();
          }
        "
        text="返回"
        class="marginB"
      ></MainButton>
    </div>
  </div>
</template>

<style scoped>
.loginContainer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pwdForgotTitle {
  font-weight: 800;
  font-size: 30px;
  padding-bottom: 30px;
}

.loginInputContainer {
  width: 400px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}

.marginB {
  margin-bottom: 13px;
}
.pwd_forgot_err {
  color: #f90202;
}
</style>
