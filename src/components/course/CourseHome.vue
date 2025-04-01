<template>
  <BaseView>
    <template #midbody>
      Course Home
      <button @click="goToEdit">發文</button>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import BaseView from "@/components/utilities/BaseView.vue";
///跳至文章編集頁面
const goToEdit = () => {
  router.push(RouterPath.HOME.COURSE.EDIT);
};
</script>

<style scoped></style>
