<template>
  <!-- Top Bar -->
  <div class="bg-red-950 w-full h-[80px] flex">

    <div class="bg-yellow-500 w-[80px] h-[80px] content-center">
      <img :src="AppImage.noTextLogo" alt="SkillStorm" class="w-[65px] h-[60px]"/>
    </div>
    
    <div class="bg-green-500 h-[80px] grow"></div>
    <div class="bg-yellow-500 w-[65px] h-[80px]"></div>
   
  </div>

  <button :class="buttonStyle('bg-yellow-500')" @click="goToLogin">登入</button>
  <button :class="buttonStyle('bg-green-500')" @click="goToRegister">註冊</button>

</template>

<script setup lang="ts">
import router from '@/router/router_manager';
import { RouterPath } from '../router/router_path';
import { AppImage } from '@/global/app_image';


function buttonStyle(style: string) {
  return `${style} pt-[5px] pb-[5px] pr-[10px] pl-[10px] m-[5px]`;
}

///跳至登入頁面
const goToLogin = () => {
  router.push(RouterPath.AUTH.LOGIN)
}
///跳至註冊頁面
const goToRegister = () => {
  router.push(RouterPath.AUTH.REGISTER)
}

</script>

<style scoped>

</style>
