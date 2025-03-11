<template>

  <div class="postBody">
    Post Home
    <button @click="createModal">modalTest</button>
    <button @click="goToEdit">發文</button>
  </div>


  <div class="postBoad">
    postBoad
  </div>
    
</template>
  
<script setup lang="ts">
import TestModal from '../utilities/BaseModal/testModal.vue';
import { ModalController } from '../utilities/BaseModal/ModalController';
import router from '@/router/router_manager';
import { RouterPath } from '@/router/router_path';

    const createModal = () => {
      // 创建 Modal 并传递 props
      new ModalController().show(TestModal);
    };

    ///跳至文章編集頁面
    const goToEdit = () => {
        router.push(RouterPath.HOME.POST.EDIT);
    }
    
</script>
  
  <style scoped>
    p{
      color: #FFFFFF;
    }

    .postBody{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    

    .postBoad{
      width: 250px;
      background-color: rgb(149, 96, 96);
    }

  </style>
  
  
  