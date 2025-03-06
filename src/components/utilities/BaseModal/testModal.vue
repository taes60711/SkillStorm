<template>
    <div class="testModal_Container">
      <h2>动态插入的内容</h2>
      <p>ModalContent</p>
      <p>{{modalProps.message}}</p> 
    </div>
</template>
  
  <script setup lang="ts">

   // 接收 modalProps 作为 prop
   const props = defineProps({
    modalProps: {
      type: Object,
    },
  });
  </script>

<style scoped>
.testModal_Container{
  background-color: rgb(174, 64, 64);
}
</style>