<template>
    <div class="left"></div>

    <!-- InfoBar -->
    <div class="InfoBar_Container">
        <img :src="AppImage.noTextLogo" alt="SkillStorm" class="w-[65px] h-[60px]"/>
        <div class="InfoBar_Message">

            <button :class="buttonStyle('bg-yellow-500')" @click="goToLogin">登入</button>
            <button :class="buttonStyle('bg-green-500')" @click="goToRegister">註冊</button>
            <button :class="buttonStyle('bg-blue-500')" @click="goToPostEdit">發文</button>
            <button @click="goToProfile">To Profile</button>
        </div>

        <div class="InforBar_Setting">
            
        </div>
    </div>

</template>
   
<script setup lang="ts">
   import { AppImage } from '@/global/app_image';
   import router from '@/router/router_manager';
   import { RouterPath } from '@/router/router_path';

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

       ///跳至文章編集頁面
    const goToPostEdit = () => {
        router.push(RouterPath.HOME.POST.EDIT);
    }
    
    ///跳至個人資料編輯頁面
    const goToProfile = () => {
        router.push(RouterPath.HOME.PROFILE.INDEX);
    }
</script>
   
<style scoped>

    .InfoBar_Container,
    .left {
        --width: 240px;
    }

    .InfoBar_Container {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: var(--width);
        background-color: red;
        display: flex;
        flex-direction: column;
    }

    .InfoBar_Message {
       width: 100%;
       flex-grow: 1;
       background-color: blue;
       display: flex;
       flex-direction: column;
    }

    .InforBar_Setting {
       width: 100%;
       height: 80px;
       background-color: rgb(62, 62, 129);
    }

   .left {
        width: var(--width);
        height: 100%;
        background-color: rgb(67, 71, 71);
    }

   

</style>
   