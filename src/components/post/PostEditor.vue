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
      >{{ viewModel.mainMessageController }}</textarea
    >

    <br />

    <PostFileEditor v-model:fileUrls="viewModel.fileMessageController.value" />

    <br />

    <button @click="viewModel.send">送出</button>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/global/global_data";
import PostEditViewModel from "@/view_models/post/post_edit_view_model";
import PostFileEditor from "./PostFileEditor.vue";
import { onBeforeMount } from "@vue/runtime-core";

const viewModel = new PostEditViewModel();

const props = defineProps<{
  modalProps: object;
}>();

onBeforeMount(() => {
  if (Object.keys(props.modalProps).length !== 0) {
    /// 導入文章
    viewModel.editInit(
      props.modalProps.postData,
      props.modalProps.listPostData
    );
  }
});
</script>

<style scoped>
.postEditor_Container {
  background-color: rgb(51, 50, 51);
  padding: 20px 15px;
  border-radius: 10px;
  width: 550px;
}
</style>
