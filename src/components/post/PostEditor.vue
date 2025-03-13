<template>
  <div class="postEditor_Container">
    <select v-model="viewModel.selectedBoard.value">
      <option value="" disabled selected>選擇一個看板</option>
      <option
        v-for="(item, index) in GlobalData.postBoard"
        v-bind:key="item"
        :value="item"
      >
        {{ item.chineseName }}
      </option>
    </select>

    <p>內文</p>

    <textarea
      v-model="viewModel.mainMessageController.value"
      placeholder="請輸入內文"
      rows="4"
      cols="50"
    >
    </textarea>

    <br />

    <PostFileEditor v-model:fileUrls="viewModel.fileMessageController.value" />

    <br />

    <button @click="viewModel.send">送出</button>

    <Modal
      :visible="viewModel.showPostSuccessModalController.value"
      @update:visible="viewModel.showPostSuccessModalController.value = $event"
    >
      <h2>發布成功</h2>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/global/global_data";
import PostEditViewModel from "@/view_models/post/post_edit_view_model";
import Modal from "../utilities/Modal.vue";
import PostFileEditor from "./PostFileEditor.vue";
const viewModel = new PostEditViewModel();
</script>

<style scoped>
.postEditor_Container {
  background-color: rgb(51, 50, 51);
  padding: 20px 15px;
  border-radius: 10px;
}
</style>
