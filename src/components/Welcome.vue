<template>

  <div class="right">
    <button :class="buttonStyle('bg-yellow-500')" @click="goToLogin">登入</button>
    <button :class="buttonStyle('bg-green-500')" @click="goToRegister">註冊</button>
  </div>



</template>

<script setup lang="ts">
  import router from '@/router/router_manager';
  import { RouterPath } from '../router/router_path';



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
 .right{

    height: 1500px;
    background-color: aqua;
  }
</style>
