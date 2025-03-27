<template>
  <div class="itemContainer">
    <!-- 一個項目時顯示的 -->
    <div v-if="formatFileMsg.length === 1" class="postFileOneItemContainer">
      <img
        v-if="formatFileMsg[0].type == 'img'"
        :src="formatFileMsg[0].value"
        :onclick="() => openView(formatFileMsg, 0)"
      />
      <iframe
        v-else-if="formatFileMsg[0].type == 'ytvideo'"
        :src="
          'https://www.youtube.com/embed/' +
          editTools.getYtvideoID(formatFileMsg[0].value)
        "
        allowfullscreen
      >
      </iframe>
    </div>
    <!-- 兩個項目時顯示的 -->
    <div
      v-else-if="formatFileMsg.length === 2"
      class="postFileTwoItemContainer"
    >
      <div
        v-for="(item, index) in formatFileMsg"
        :key="index"
        class="twoItemBox"
      >
        <div v-if="item.type == 'img'">
          <img
            :src="item.value"
            :onclick="() => openView(formatFileMsg, index)"
            :class="{
              'first-item': index === 0,
              'last-item': index === formatFileMsg.length - 1,
            }"
          />
        </div>

        <div v-else-if="item.type == 'ytvideo'" class="yt-video-container">
          <img
            :src="`https://img.youtube.com/vi/${editTools.getYtvideoID(
              item.value
            )}/hqdefault.jpg`"
            :class="{
              'first-item': index === 0,
              'last-item': index === formatFileMsg.length - 1,
            }"
            :onclick="() => openView(formatFileMsg, index)"
          />
          <!-- 播放按钮 -->
          <div class="play-button" @click="openView(formatFileMsg, index)">
            ▶
          </div>
        </div>
      </div>
    </div>
    <!-- 兩個以上項目時顯示的 -->
    <div v-else class="postFileContainer">
      <MainButton
        :onPress="() => onChangePage('back')"
        text="<"
        class="leftBtn"
      ></MainButton>
      <img
        v-if="choicedFile.type == 'img'"
        :src="choicedFile.value"
        :onclick="() => openView(formatFileMsg, 0)"
      />
      <iframe
        v-else-if="choicedFile.type == 'ytvideo'"
        :src="
          'https://www.youtube.com/embed/' +
          editTools.getYtvideoID(choicedFile.value)
        "
        allowfullscreen
      >
      </iframe>
      <MainButton
        :onPress="() => onChangePage('next')"
        text=">"
        class="rightBtn"
      ></MainButton>

      <div class="postFileDotContainer">
        <div class="postFileDot"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageVideoVIew from "@/components/utilities/Modal/ImageVideoVIew.vue";
import { ModalController } from "@/components/utilities/Modal/ModalController";
import MainButton from "@/components/utilities/MainButton.vue";
import { EditTools } from "@/global/edit_tools";
import type { FileMsgModel } from "@/models/post_file_msg_model";
import { ref } from "vue";
import { onMounted } from "vue";

const editTools: EditTools = new EditTools();
const modalController = new ModalController();

const props = defineProps<{
  fileMessage: string[];
}>();

const formatFileMsg = ref<FileMsgModel[]>([]);

/// 兩個以上項目
const choicedFile = ref<FileMsgModel>({ type: "img", value: "" });
const nowIndex = ref<number>(0);

onMounted(() => {
  /// 整形Url格式
  for (let index = 0; index < props.fileMessage.length; index++) {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

    const element = props.fileMessage[index];
    const fileExtension = element.split(".").pop()?.toLowerCase();

    if (
      imageExtensions.includes(fileExtension) ||
      fileExtension.includes("images")
    ) {
      const imgstr: string = editTools.getRealImgStr(element);
      formatFileMsg.value.push({ type: "img", value: imgstr });
    } else {
      formatFileMsg.value.push({ type: "ytvideo", value: element });
    }
  }

  console.log(formatFileMsg.value.length);

  if (formatFileMsg.value.length > 2) {
    choicedFile.value = formatFileMsg.value[0];
  }
});

/// 開啟預覽視窗
const openView = (fileMsg: FileMsgModel[], index: number) => {
  console.log(fileMsg);

  const values = fileMsg.map((item) => item.value);

  modalController.show(
    ImageVideoVIew,
    { fileMsg: values, index: index },
    true,
    true,
    "rgba(0, 0, 0, 0.4)",
    "ImageVideoView"
  );
};

/// 兩個以上項目 切換顯示圖
const onChangePage = (changeType: string) => {
  if (changeType == "next") {
    if (nowIndex.value + 1 < formatFileMsg.value.length) {
      nowIndex.value = nowIndex.value + 1;
      choicedFile.value = formatFileMsg.value[nowIndex.value];
    }
  } else if (changeType == "back") {
    if (nowIndex.value - 1 >= 0) {
      nowIndex.value = nowIndex.value - 1;
      choicedFile.value = formatFileMsg.value[nowIndex.value];
    }
  }
};
</script>

<style scoped>
.itemContainer {
  width: 100%;
}

.postFileContainer {
  width: 80%;
  height: 293px;
  position: relative;
  display: flex;
  justify-self: center;
}

.postFileContainer .rightBtn {
  position: absolute;
  right: 0;
  top: 50%;
}

.postFileContainer .leftBtn {
  position: absolute;
  left: 0;
  top: 50%;
}

.postFileContainer .postFileDotContainer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.postFileDotContainer .postFileDot {
  width: 10px;
  height: 10px;
  background-color: aqua;
  margin-left: 5px;
  margin-right: 5px;
}

.postFileContainer img,
.postFileContainer iframe {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid rgb(66, 66, 66);
  object-fit: cover;
}

.postFileOneItemContainer img,
.postFileOneItemContainer iframe {
  max-height: 510px;
  max-width: 80%;
  border-radius: 10px;
  border: 1px solid rgb(66, 66, 66);
}

.postFileOneItemContainer iframe {
  width: 100%;
  height: 293px;
  display: flex;
  justify-self: center;
}

.postFileTwoItemContainer {
  height: 293px;
  max-width: 90%;
  border-radius: 10px;
  border: 1px solid rgb(66, 66, 66);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-self: center;
}

.postFileTwoItemContainer .twoItemBox {
  width: 49.8%;
}

.postFileTwoItemContainer img,
.postFileTwoItemContainer iframe {
  width: 100%;
  height: 291px;
  object-fit: cover;
}

.postFileTwoItemContainer .first-item {
  border-radius: 10px 0 0 10px;
}

.postFileTwoItemContainer .last-item {
  border-radius: 0 10px 10px 0;
}

.yt-video-container {
  position: relative;
  display: inline-block;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 50%;
  cursor: default;
}
</style>
