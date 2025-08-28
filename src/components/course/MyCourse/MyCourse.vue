<template>
  <MyAddedCourse
    v-if="nowPage == '加入的'"
    :chageMyCoursePage="changePage"
  ></MyAddedCourse>
  <MyCreateCourse
    v-else-if="nowPage == '我的'"
    :chageMyCoursePage="changePage"
  ></MyCreateCourse>
</template>

<script setup lang="ts">
import MyCreateCourse from "./MyCreateCourse.vue";
import MyAddedCourse from "./MyAddedCourse.vue";
import { ref } from "@vue/runtime-core";

const nowPage = ref<String>("加入的");

function changePage(page: String) {
  nowPage.value = page;
}
</script>

<style scoped></style>
