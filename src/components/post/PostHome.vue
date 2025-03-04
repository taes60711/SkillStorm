<template>
    <div>
        Post Home
    </div>

    
    <button @click="goToProfile">To Profile</button>
  </template>
  
  <script setup lang="ts">
    import router from '@/router/router_manager';
    import { RouterPath } from '@/router/router_path';


    const goToProfile = () => {
        router.push(RouterPath.HOME.PROFILE.INDEX);
    }
    
  </script>
  
  <style scoped>
    p{
      color: #FFFFFF;
    }
  </style>
  
  
  