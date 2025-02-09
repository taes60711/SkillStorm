<script setup lang="ts">

import { ref } from 'vue';
import RichTextEditor from '../utilities/RichTextEditor.vue';


</script>

<template>
  <div>
    <input type="text">
    
    <RichTextEditor></RichTextEditor>
   
    <button @click="">送出</button>
   
  </div>
</template>

<style scoped>
  p{
    color: #FFFFFF;
  }

  .pwd_forgot_err{
    color: #f90202;
  }
</style>
