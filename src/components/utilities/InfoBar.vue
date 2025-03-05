<template>
    <div class="left"></div>

    <!-- InfoBar -->
    <div class="InfoBar_Container">
        <img :src="AppImage.noTextLogo" alt="SkillStorm" class="w-[65px] h-[60px]"/>
        <div class="InfoBar_Message"></div>
    </div>

</template>
   
<script setup lang="ts">
   import { AppImage } from '@/global/app_image';
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
    }

   .left {
        width: var(--width);
        height: 100%;
        background-color: rgb(67, 71, 71);
    }

   

</style>
   