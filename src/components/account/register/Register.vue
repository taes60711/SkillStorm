<template>
  <BaseView>
    <template #midbody>
      <img :src="AppImage.logo" alt="SkillStorm" class="logo" />

      <div v-if="viewModel.stepIndex.value === 0">
        <!-- 註冊輸入Email頁面 -->
        <RegisterStepOne v-model:RegisterViewModel="viewModel">
        </RegisterStepOne>
      </div>
      <div v-else-if="viewModel.stepIndex.value === 1">
        <!-- 註冊第1階段 -->
        <RegisterStepTwo v-model:RegisterViewModel="viewModel">
        </RegisterStepTwo>
      </div>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import { AppImage } from "@/global/app_image";
import RegisterViewModel from "../../../view_models/account/register_view_model";
import RegisterStepOne from "./RegisterStepOne.vue";
import RegisterStepTwo from "./RegisterStepTwo.vue";
import BaseView from "@/components/utilities/BaseView.vue";

/// 註冊頁面ViewModel
const viewModel = new RegisterViewModel();
</script>

<style scoped></style>
