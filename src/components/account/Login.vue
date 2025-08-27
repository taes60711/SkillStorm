<template>
  <div class="loginContainer">
    <img :src="AppImage.logo" alt="SkillStorm" class="logo" />

    <div class="loginInputContainer">
      <div class="loginTitle">登入</div>

      <input
        placeholder="email"
        class="textInput marginB"
        v-model="viewModel.emailController.value"
      />

      <input
        type="password"
        placeholder="password"
        class="textInput marginB"
        v-model="viewModel.pwdController.value"
      />

      <a
        class="forgot-password marginB"
        href="#"
        @click.prevent="viewModel.toForgotPwdPage"
        >忘記密碼？</a
      >

      <div v-if="viewModel.error.value != ''" class="errMessage marginB">
        {{ viewModel.error.value }}
      </div>

      <MainButton
        :onPress="viewModel.handleLogin"
        text="登入"
        class="marginB"
      ></MainButton>

      <MainButton
        :onPress="viewModel.toRegisterPage"
        text="建立新帳號"
        class="marginB"
      ></MainButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import LoginViewModel from "../../view_models/account/login_view_model";
import MainButton from "@/components/utilities/MainButton.vue";

const viewModel = new LoginViewModel();
</script>

<style scoped>
.loginContainer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.loginTitle {
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

.errMessage {
  color: red;
}

.marginB {
  margin-bottom: 13px;
}

.forgot-password {
  display: flex;
  align-self: flex-end;
  font-size: 14px;
}
.forgot-password:hover {
  color: rgb(118, 118, 118);
}
</style>
