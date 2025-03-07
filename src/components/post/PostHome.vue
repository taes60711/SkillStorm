<template>

  <div class="postBody">
    Post Home
    <button @click="createModal">test</button>
  </div>
  <div class="postBoad">
    postBoad
   
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

    .postBody{
      min-width: 650px;
      background-color: black;
      flex-grow: 1;
    }

    .postBoad{
      width: 250px;
      background-color: rgb(149, 96, 96);
    }

  </style>
  
  
  