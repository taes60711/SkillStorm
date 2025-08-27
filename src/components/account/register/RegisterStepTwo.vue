<template>
  <div class="loginInputContainer">
    <div class="SignUpTitle">註冊</div>
    <input
      type="text"
      placeholder="名稱"
      class="textInput marginB"
      v-model="viewModel.nameController.value"
    />

    <input
      type="password"
      placeholder="密碼"
      class="textInput"
      v-model="viewModel.pwdController.value"
    />
    <div class="password-requirements marginB">
      <div class="requirement" :class="{ met: viewModel.passwordLength.value }">
        <span class="x-mark">&#10005;</span>六碼以上
      </div>
      <div class="requirement" :class="{ met: viewModel.hasEnglish.value }">
        <span class="x-mark">&#10005;</span>含有英文
      </div>
      <div class="requirement" :class="{ met: viewModel.hasNumber.value }">
        <span class="x-mark">&#10005;</span>含有數字
      </div>
    </div>

    <input
      type="password"
      placeholder="確認密碼"
      class="textInput marginB"
      v-model="viewModel.confirmPwdController.value"
    />
    <p v-if="!viewModel.passwordsMatch.value">密碼不相同</p>

    <input
      type="text"
      placeholder="驗證碼"
      class="textInput marginB"
      v-model="viewModel.captchaController.value"
    />

    <MainButton :onPress="() => {}" text="註冊" class="marginB"></MainButton>

    <MainButton
      :onPress="
        () => {
          viewModel.pageChange(0);
        }
      "
      text="退回"
    ></MainButton>
  </div>
</template>

<script setup lang="ts">
import MainButton from "@/components/utilities/MainButton.vue";
const viewModel = defineModel("RegisterViewModel");
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
  color: #4a90e2;
}

.requirement.met .x-mark {
  color: #4a90e2;
}

.x-mark {
  font-size: 10px;
  color: #666666;
}

.marginB {
  margin-bottom: 13px;
}

.SignUpTitle {
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
</style>
