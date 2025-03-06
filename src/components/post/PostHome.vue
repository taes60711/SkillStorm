<template>
    <div>
        Post Home
        <button @click="createModal">test</button>
    </div>
    
   
  </template>
  
  <script setup lang="ts">
    import TestModal from '../utilities/BaseModal/testModal.vue';
    import { ModalController } from '../utilities/BaseModal/ModalController';

    

    const createModal = () => {
      // 创建 Modal 并传递 props
      new ModalController().show(TestModal);
    };
    
  </script>
  
  <style scoped>
    p{
      color: #FFFFFF;
    }
  </style>
  
  
  