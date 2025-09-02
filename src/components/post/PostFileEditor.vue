<template>
  <!-- 圖片或Yt影片顯示 -->

  <div class="postFileEditorContainer">
    <div v-for="(fileUrl, index) in fileUrls" v-bind:key="fileUrl">
      <div class="container">
        <MainButton :onPress="() => deleteEditingFile(index)">
          <i class="fa-solid fa-x fileDeleteBtn"></i>
        </MainButton>
        <div v-if="fileUrl == ''"></div>
        <iframe
          v-else-if="fileUrl.includes(`youtube`)"
          class="fileContainer"
          :src="
            'https://www.youtube.com/embed/' + editTools.getYtvideoID(fileUrl)
          "
          allowfullscreen
        >
        </iframe>

        <div v-else class="fileContainer">
          <img
            :src="editTools.getRealImgStr(fileUrl)"
            @click="
              (e) => {
                e.stopPropagation();
              }
            "
          />
        </div>
      </div>
    </div>
  </div>

  <div class="editBottomBar">
    <!-- 隱藏的檔案輸入框 -->
    <input
      type="file"
      ref="fileInput"
      accept="image/jpeg, image/png, image/gif"
      @change="handlelocalImg"
      class="hidden"
    />
    <!-- 自定義上傳按鈕 -->
    <MainButton
      :onPress="
        () => {
          editTools.triggerFileInput();
        }
      "
    >
      <i class="fa-solid fa-image editIcon"></i>
    </MainButton>

    <MainButton
      :onPress="
        () => {
          showModal = !showModal;
        }
      "
    >
      <i class="fa-solid fa-link editIcon"></i>
    </MainButton>

    <MainButton
      :onPress="
        () => {
          showVideoModal = !showVideoModal;
        }
      "
    >
      <i class="fa-solid fa-film editIcon"></i>
    </MainButton>
  </div>

  <!-- youtubeVideo Insert -->
  <Modal
    :visible="showVideoModal"
    :confirmFunc="() => handleYtVideo(youtubeController)"
    @update:visible="showVideoModal = $event"
  >
    <input
      type="text"
      class="textInput modalTextInput"
      placeholder="請輸入Youtube URL"
      v-model="youtubeController"
    />
  </Modal>

  <!-- Img Insert -->
  <Modal
    :visible="showModal"
    :confirmFunc="() => handleUrlImg(urlImgController)"
    @update:visible="showModal = $event"
  >
    <input
      type="text"
      class="textInput modalTextInput"
      placeholder="請輸入圖片 URL"
      v-model="urlImgController"
    />
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/utilities/EditorModal.vue";
import { EditTools } from "@/global/edit_tools";
import { ref } from "vue";
import MainButton from "@/components/utilities/MainButton.vue";
import { ModalController } from "../utilities/Modal/ModalController";
import ConfirmModal from "../utilities/Modal/confirmModal.vue";

const fileUrls = defineModel("fileUrls");
const editTools = new EditTools();

const showModal = ref(false);
const urlImgController = ref<string>("");

const showVideoModal = ref(false);
const youtubeController = ref<string>("");

const modalController: ModalController = new ModalController();

const handlelocalImg = async (event: Event) => {
  if (fileLengthCheck()) {
    return;
  }

  const base64Img: string = await editTools.handleLocalImgChange(event);
  const imgUrl: string = await editTools.uploadImgToDatabase(base64Img);
  fileUrls.value.push(imgUrl);
};

const handleYtVideo = (videoUrl: string) => {
  if (fileLengthCheck()) {
    return;
  }

  const ytId: string = editTools.getYtvideoID(videoUrl);

  if (ytId == "err") {
    modalController.show(
      ConfirmModal,
      {
        modalText: "請輸入正確Youtube URL",
        needTitile: true,
        confirmFunc: () => {
          modalController.close();
        }
      },
      false,
      true,
      "rgba(0, 0, 0, 0.4)",
      "errConfirmModal"
    );
    return;
  }
  const ytURL: string = `https://www.youtube.com/embed/${ytId}`;
  fileUrls.value.push(ytURL);
};

const handleUrlImg = (imgUrl: string) => {
  if (fileLengthCheck()) {
    return;
  }
  console.log(imgUrl);
  if (!imgUrl) {
    return;
  }

  fileUrls.value.push(imgUrl);
};

const deleteEditingFile = (index: number) => {
  fileUrls.value.splice(index, 1);
};

const fileLengthCheck = (): boolean => {
  if (fileUrls.value.length >= 7) {
    modalController.show(
      ConfirmModal,
      {
        modalText: "檔案不得超過７個檔案",
        needTitile: true,
        confirmFunc: () => {
          modalController.close();
        }
      },
      false,
      true,
      "rgba(0, 0, 0, 0.4)",
      "fileLengthErrConfirmModal"
    );
    return true;
  } else {
    return false;
  }
};
</script>

<style scoped>
.postFileEditorContainer {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 5px;
}

.postFileEditorContainer .container {
  position: relative;
  margin-right: 10px;
}

.fileContainer {
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid #706f6f;
  border-radius: 10px;
}

.fileDeleteBtn {
  color: white;
  cursor: pointer;
  padding: 4px 6px 4px 6px;
  background-color: #706f6f;
  border-radius: 50%;
  right: 18px;
  top: 6px;
  position: absolute;
}

.editBottomBar {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.editBottomBar .editIcon {
  margin-right: 14px;
  color: white;
  font-size: 18px;
}

.modalTextInput {
  width: 100%;
  margin: 20px 0px;
}
</style>
