<template>
  <div class="loginInputContainer">
    <div class="SignUpTitle">註冊</div>
    <input
      type="text"
      placeholder="email"
      v-model="viewModel.emailController.value"
      class="textInput marginB"
    />
    <p class="register_err" v-if="viewModel.emailError.value != ''">
      {{ viewModel.emailError.value }}
    </p>
    <MainButton
      :onPress="viewModel.signUpStart"
      text="開始註冊"
      class="marginB"
    ></MainButton>
    <MainButton :onPress="viewModel.toLoginPage" text="返回"></MainButton>
  </div>
</template>

<script setup lang="ts">
import MainButton from "@/components/utilities/MainButton.vue";

const viewModel = defineModel("RegisterViewModel");
</script>

<style scoped>
.register_err {
  color: #f90202;
}

.SignUpTitle {
  font-weight: 800;
  font-size: 30px;
  padding-bottom: 30px;
}

.marginB {
  margin-bottom: 13px;
}

.loginInputContainer {
  width: 400px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}
</style>
