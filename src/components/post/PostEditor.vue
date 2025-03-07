<template>
  <div>

    <Dropdown 
      v-model="viewModel.selectedBoard.value" 
      :panelStyle="{ backgroundColor: '#FF6347' }" 
      :options="GlobalData.posBoard" 
      optionLabel="chineseName" 
      placeholder="選擇一個看板"
    />

    <p>內文</p>

    <textarea 
      v-model="viewModel.mainMessageController.value" 
      placeholder="請輸入內文" 
      rows="4" 
      cols="50"
    >
    </textarea>
    
     <!-- 暫時+br -->
     <br>

    <PostFileEditor 
      v-model:fileUrls = "viewModel.fileMessageController.value"
    />
   
    <!-- 暫時+br -->
    <br>

    <button 
      @click="viewModel.send">
      送出
    </button>

    <Modal 
      :visible="viewModel.showPostSuccessModalController.value" 
      @update:visible="viewModel.showPostSuccessModalController.value = $event">
      <h2>發布成功</h2>
    </Modal>

  </div>
</template>

<script setup lang="ts">
import { GlobalData } from '@/global/global_data';
import PostEditViewModel from '@/view_models/post/post_edit_view_model';
import Dropdown from 'primevue/dropdown';
import Modal from '../utilities/Modal.vue';
import PostFileEditor from './PostFileEditor.vue';
  const viewModel = new PostEditViewModel();
</script>

<style scoped>
  p{
    color: #FFFFFF;
  }
</style>


