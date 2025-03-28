<template>
  <!-- 圖片或Yt影片顯示 -->
  <div v-for="(fileUrl, index) in fileUrls" v-bind:key="fileUrl">
    <p>{{ `index ${index} : ${fileUrl}` }}</p>
    <button @click="deleteEditingFile(index)">刪除</button>
  </div>

  <!-- 隱藏的檔案輸入框 -->
  <input
    type="file"
    ref="fileInput"
    accept="image/jpeg, image/png, image/gif"
    @change="handlelocalImg"
    class="hidden"
  />

  <!-- 自定義上傳按鈕 -->
  <button
    @click="editTools.triggerFileInput"
    class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
  >
    選擇圖片
  </button>

  <button
    @click="
      () => {
        showModal = !showModal;
      }
    "
    class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
  >
    圖片Url
  </button>

  <button
    @click="
      () => {
        showVideoModal = !showVideoModal;
      }
    "
    class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
  >
    Yt影片Url
  </button>

  <!-- youtubeVideo Insert -->
  <Modal :visible="showVideoModal" @update:visible="showVideoModal = $event">
    <h2>youtube URL</h2>
    <input type="text" v-model="youtubeController" />
    <button @click="handleYtVideo(youtubeController)">插入影片</button>
  </Modal>

  <!-- Img Insert -->
  <Modal :visible="showModal" @update:visible="showModal = $event">
    <h2>Image URL</h2>
    <input type="text" v-model="urlImgController" />
    <button @click="handleUrlImg(urlImgController)">插入圖片</button>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../utilities/Modal.vue";
import { EditTools } from "@/global/edit_tools";
import { ref } from "vue";
import PostFile from "./postHome/PostFile.vue";

const fileUrls = defineModel("fileUrls");
const editTools = new EditTools();

const showModal = ref(false);
const urlImgController = ref<string>("");

const showVideoModal = ref(false);
const youtubeController = ref<string>("");

const handlelocalImg = async (event: Event) => {
  const base64Img: string = await editTools.handleLocalImgChange(event);
  const imgUrl: string = await editTools.uploadImgToDatabase(base64Img);
  fileUrls.value.push(imgUrl);
};

const handleYtVideo = (videoUrl: string) => {
  const ytId: string = editTools.getYtvideoID(videoUrl);
  const ytURL: string = `https://www.youtube.com/embed/${ytId}`;
  fileUrls.value.push(ytURL);
};

const handleUrlImg = (imgUrl: string) => {
  console.log(imgUrl);
  fileUrls.value.push(imgUrl);
};

const deleteEditingFile = (index: number) => {
  fileUrls.value.splice(index, index + 1);
};
</script>

<style scoped></style>
