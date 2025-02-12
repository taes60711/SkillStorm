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
  <router-view v-if="isInit"></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
