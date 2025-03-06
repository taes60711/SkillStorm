<template>
    <div>
        Post Home
        <button @click="createModal">test</button>
    </div>

    <button @click="goToProfile">To Profile</button>
  </template>
  
  <script setup lang="ts">
    import router from '@/router/router_manager';
    import { RouterPath } from '@/router/router_path';
    import TestModal from '../utilities/BaseModal/testModal.vue';
    import { ModalController } from '../utilities/BaseModal/ModalController';

    

    const createModal = () => {
      

      // 创建 Modal 并传递 props
      new ModalController().show(TestModal);
    };


    const goToProfile = () => {
        router.push(RouterPath.HOME.PROFILE.INDEX);
    }
    
  </script>
  
  <style scoped>
    p{
      color: #FFFFFF;
    }
  </style>
  
  
  