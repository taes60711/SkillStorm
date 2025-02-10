<script setup lang="ts">
import RichTextEditor from '../utilities/RichTextEditor.vue';
import PostEditViewModel from '@/view_models/post/post_edit_view.model';

  const viewModel = new PostEditViewModel();
</script>

<template>
  <div>
    <p>標題</p>
    <input type="text" v-model="viewModel.titleController.value">
    
    <RichTextEditor v-model:htmlString="viewModel.htmlString.value"></RichTextEditor>
   
    <button @click="viewModel.send">送出</button>
   
  </div>
</template>

<style scoped>
  p{
    color: #FFFFFF;
  }
</style>
