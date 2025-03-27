<template>
  <div class="basebody">
    Course Home
    <button @click="goToEdit">發文</button>
  </div>
</template>

<script setup lang="ts">
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";

///跳至文章編集頁面
const goToEdit = () => {
  router.push(RouterPath.HOME.COURSE.EDIT);
};
</script>

<style scoped></style>
