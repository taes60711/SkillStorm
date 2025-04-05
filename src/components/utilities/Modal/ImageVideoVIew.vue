<template>
  <MainButton :onPress="() => onChangePage('back')" class="leftBtn">
    <i
      class="fa-solid fa-circle-chevron-left"
      :style="{ fontSize: '40px', color: 'white' }"
    ></i>
  </MainButton>

  <div class="imgVideoContainer">
    <img v-if="formatFileMsg.type == 'img'" :src="formatFileMsg.value" />
    <iframe
      v-else-if="formatFileMsg.type == 'ytvideo'"
      :src="formatFileMsg.value"
      allowfullscreen
    >
    </iframe>
  </div>

  <MainButton :onPress="() => onChangePage('next')" class="rightBtn">
    <i
      class="fa-solid fa-circle-chevron-right"
      :style="{ fontSize: '40px', color: 'white' }"
    ></i>
  </MainButton>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import MainButton from "@/components/utilities/MainButton.vue";
import { ref } from "vue";
import type { FileMsgModel } from "@/models/post_file_msg_model";

const props = defineProps<{
  modalProps: object;
}>();

const formatFileMsg = ref<FileMsgModel>({ type: "img", value: "" });
const nowIndex = ref<number>(0);

onMounted(() => {
  nowIndex.value = props.modalProps.index;
  getFormatFileMsg();
});

const onChangePage = (changeType: string) => {
  if (changeType == "next") {
    if (nowIndex.value + 1 < props.modalProps.fileMsg.length) {
      nowIndex.value = nowIndex.value + 1;
      getFormatFileMsg();
    }
  } else if (changeType == "back") {
    if (nowIndex.value - 1 >= 0) {
      nowIndex.value = nowIndex.value - 1;
      getFormatFileMsg();
    }
  }
};

const getFormatFileMsg = () => {
  const element = props.modalProps.fileMsg[nowIndex.value];
  if (element.includes("youtube")) {
    formatFileMsg.value = { type: "ytvideo", value: element };
  } else {
    formatFileMsg.value = { type: "img", value: element };
  }
};
</script>

<style scoped>
.imgVideoContainer {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgVideoContainer img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.imgVideoContainer iframe {
  width: 65%;
  min-height: 520px;
  position: absolute;
}

.leftBtn {
  position: fixed;
  left: 40px;
}

.rightBtn {
  position: fixed;
  right: 40px;
}
</style>
