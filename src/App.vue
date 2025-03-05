<script setup lang="ts">
import { onMounted } from 'vue';
import { userDataStore } from './global/user_data';
import { GlobalData } from './global/global_data';
import { ref } from 'vue';

const isInit= ref<boolean>(false);

onMounted(async () => {
  // 從 localStorage 初始化用戶資料
  userDataStore.initializeFromLocalStorage();
  /// 取得全域資料
  await GlobalData.init();

  isInit.value = true;
});

</script>

<template>
<router-view v-if="isInit" name="aside"></router-view>
<router-view v-if="isInit"></router-view>
</template>

<style>
@import '../src/assets/css/base.css';

</style>
