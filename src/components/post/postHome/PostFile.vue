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
          <div class="play-button" @click="openView(formatFileMsg, index)">
            ▶
          </div>
        </div>
      </div>
    </div>
    <!-- 三個項目時顯示的 -->
    <div
      v-else-if="formatFileMsg.length === 3"
      class="postFileThreeItemContainer"
    >
      <div class="first-item">
        <div v-if="formatFileMsg[0].type == 'img'">
          <img
            :src="formatFileMsg[0].value"
            :onclick="() => openView(formatFileMsg, 0)"
          />
        </div>

        <div
          v-else-if="formatFileMsg[0].type == 'ytvideo'"
          class="yt-video-container"
        >
          <img
            :src="`https://img.youtube.com/vi/${editTools.getYtvideoID(
              formatFileMsg[0].value
            )}/hqdefault.jpg`"
            :onclick="() => openView(formatFileMsg, 0)"
          />

          <div class="play-button" @click="openView(formatFileMsg, 0)">▶</div>
        </div>
      </div>
      <div class="twice-third-itemContianer">
        <div class="twice-item">
          <div v-if="formatFileMsg[1].type == 'img'">
            <img
              :src="formatFileMsg[1].value"
              :onclick="() => openView(formatFileMsg, 1)"
            />
          </div>

          <div
            v-else-if="formatFileMsg[1].type == 'ytvideo'"
            class="yt-video-container"
          >
            <img
              :src="`https://img.youtube.com/vi/${editTools.getYtvideoID(
                formatFileMsg[1].value
              )}/hqdefault.jpg`"
              :onclick="() => openView(formatFileMsg, 1)"
            />

            <div class="play-button" @click="openView(formatFileMsg, 1)">▶</div>
          </div>
        </div>
        <div class="third-item">
          <div v-if="formatFileMsg[2].type == 'img'">
            <img
              :src="formatFileMsg[2].value"
              :onclick="() => openView(formatFileMsg, 2)"
            />
          </div>

          <div
            v-else-if="formatFileMsg[2].type == 'ytvideo'"
            class="yt-video-container"
          >
            <img
              :src="`https://img.youtube.com/vi/${editTools.getYtvideoID(
                formatFileMsg[2].value
              )}/hqdefault.jpg`"
              :onclick="() => openView(formatFileMsg, 2)"
            />

            <div class="play-button" @click="openView(formatFileMsg, 2)">▶</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 三個以上項目時顯示的 -->
    <div v-else class="postFileContainer">
      <MainButton :onPress="() => onChangePage('back')" class="leftBtn">
        <i
          class="fa-solid fa-circle-chevron-left"
          :style="{ fontSize: '25px' }"
        ></i>
      </MainButton>
      <img
        v-if="choicedFile.type == 'img'"
        :src="choicedFile.value"
        :onclick="() => openView(formatFileMsg, nowIndex)"
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
      <MainButton :onPress="() => onChangePage('next')" class="rightBtn">
        <i
          class="fa-solid fa-circle-chevron-right"
          :style="{ fontSize: '25px' }"
        ></i>
      </MainButton>

      <div class="postFileDotContainer">
        <MainButton
          v-for="(item, index) in formatFileMsg"
          :onPress="() => onChangePage(null, index)"
          v-bind:key="index"
          ><div
            :class="{
              postFileDot: index !== nowIndex,
              choicedPostFileDot: index === nowIndex,
            }"
          ></div
        ></MainButton>
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
import { watch } from "@vue/runtime-dom";

const editTools: EditTools = new EditTools();
const modalController = new ModalController();

const fileMessage = defineModel("fileMessage");

const formatFileMsg = ref<FileMsgModel[]>([]);

/// 兩個以上項目
const choicedFile = ref<FileMsgModel>({ type: "img", value: "" });
const nowIndex = ref<number>(0);

onMounted(() => {
  /// 整形Url格式
  formatFileMessages();
});

watch(fileMessage, () => {
  formatFileMessages();
});
/// 整形Url格式
const formatFileMessages = () => {
  formatFileMsg.value = [];

  for (let index = 0; index < fileMessage.value.length; index++) {
    const element = fileMessage.value[index];

    if (element.includes("youtube")) {
      formatFileMsg.value.push({ type: "ytvideo", value: element });
    } else {
      const imgstr: string = editTools.getRealImgStr(element);
      formatFileMsg.value.push({ type: "img", value: imgstr });
    }
  }

  if (formatFileMsg.value.length > 3) {
    choicedFile.value = formatFileMsg.value[0];
  }
};

/// 開啟預覽視窗
const openView = (fileMsg: FileMsgModel[], index: number) => {
  console.log(fileMsg);

  const values = fileMsg.map((item) => item.value);

  modalController.show(
    ImageVideoVIew,
    { fileMsg: values, index: index },
    true,
    true,
    "rgba(0, 0, 0, 0.85)",
    "ImageVideoView"
  );
};

/// 兩個以上項目 切換顯示圖
const onChangePage = (
  changeType: string | undefined,
  changeIndex: number | undefined
) => {
  if (changeType != undefined) {
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
  }

  if (changeIndex != undefined) {
    nowIndex.value = changeIndex;
    choicedFile.value = formatFileMsg.value[nowIndex.value];
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
  right: 10px;
  top: 50%;
}

.postFileContainer .leftBtn {
  position: absolute;
  left: 10px;
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

.postFileDotContainer .postFileDot,
.postFileDotContainer .choicedPostFileDot {
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: rgb(92, 92, 92);
  margin: 0 3px;
}

.postFileDotContainer .choicedPostFileDot {
  background-color: rgb(241, 238, 238);
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
  width: 90%;
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

.postFileThreeItemContainer {
  height: 293px;
  width: 90%;
  border-radius: 10px;
  border: 1px solid rgb(66, 66, 66);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-self: center;
}

.postFileThreeItemContainer .first-item {
  width: 49.8%;
  height: 100%;
}

.first-item img {
  height: 291px;
  object-fit: cover;
  border-radius: 10px 0px 0px 10px;
}

.postFileThreeItemContainer .twice-third-itemContianer {
  width: 49.8%;
  height: 100%;
  border-radius: 0px 10px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.postFileThreeItemContainer .twice-item {
  width: 100%;
  height: 49.8%;
}

.postFileThreeItemContainer .third-item {
  width: 100%;
  height: 49.8%;
}

.twice-item img,
.third-item img {
  height: calc(289px / 2);
  width: 293px;
  object-fit: cover;
}

.twice-item img {
  border-radius: 0px 10px 0px 0px;
}

.third-item img {
  border-radius: 0px 0px 10px 0px;
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
