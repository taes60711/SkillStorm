<script setup lang="ts">
import { GlobalData } from '@/global/global_data';
import RichTextEditor from '../utilities/RichTextEditor.vue';
import PostEditViewModel from '@/view_models/post/post_edit_view.model';
import Dropdown from 'primevue/dropdown';


  const viewModel = new PostEditViewModel();


</script>

<template>
  <div>
    <p>標題</p>
    <input type="text" v-model="viewModel.titleController.value">
    
    <Dropdown v-model="viewModel.selectedBoard.value" :options="GlobalData.posBoard" optionLabel="chineseName" placeholder="選擇一個看板"/>
    
    <RichTextEditor v-model:htmlString="viewModel.htmlString.value"></RichTextEditor>
   
    <button @click="viewModel.send">送出</button>
   
  </div>
</template>

<style scoped>
  p{
    color: #FFFFFF;
  }
</style>
