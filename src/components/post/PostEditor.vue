<template>
  <div class="postEditor_Container">
    <div class="boardContainer">
      <div class="typeContainer">
        <i class="fa fa-tag" :style="{ color: 'white', fontSize: '18px' }"></i>
        <select v-model="viewModel.selectedBoard.value">
          <option
            v-for="(item, index) in GlobalData.postBoard"
            v-bind:key="item"
            :value="item"
          >
            {{ item.chineseName }}
          </option>
        </select>
        <i class="fa-solid fa-angle-down" style="color: white"></i>
      </div>
      <MainButton :onPress="viewModel.send" text="送出" class="createButton">
      </MainButton>
    </div>

    <textarea
      v-model="viewModel.mainMessageController.value"
      placeholder="請輸入內文"
      rows="4"
      cols="50"
      >{{ viewModel.mainMessageController }}</textarea
    >

    <PostFileEditor v-model:fileUrls="viewModel.fileMessageController.value" />
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/global/global_data";
import PostEditViewModel from "@/view_models/post/post_edit_view_model";
import PostFileEditor from "./PostFileEditor.vue";
import { onBeforeMount } from "@vue/runtime-core";
import MainButton from "@/components/utilities/MainButton.vue";

const viewModel = new PostEditViewModel();

const props = defineProps<{
  modalProps: object;
}>();

onBeforeMount(() => {
  console.log(Object.keys(props.modalProps).length);

  if (Object.keys(props.modalProps).length >= 2) {
    /// 導入文章
    viewModel.editInit(
      props.modalProps.postData,
      props.modalProps.listPostData
    );
  } else if (Object.keys(props.modalProps).length >= 1) {
    viewModel.createEditInit(props.modalProps.listPostData);
  }
});
</script>

<style scoped>
.postEditor_Container {
  background-color: rgb(51, 50, 51);
  padding: 20px 15px;
  border-radius: 10px;
  width: 550px;
  display: flex;
  flex-direction: column;
}

.boardContainer {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
}

.boardContainer .createButton {
  background-color: rgb(32, 33, 33);
}
.typeContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
