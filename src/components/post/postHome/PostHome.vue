<template>
  <div class="mainbody">
    <div class="postbody">
      <div class="postTab">
        <button @click="changePage(news)" class="postTabBtn">最新</button>
        <button @click="changePage()" class="postTabBtn">人氣</button>
      </div>

      <div class="postCreateContainer">
        <Avatar
          :imgurl="userDataStore.userData.value.image"
          size="40px"
          borderRadius="50px"
        />
        <MainButton
          :onPress="goToEdit"
          text="發佈新文章"
          class="postCreateBtn"
        ></MainButton>
      </div>
      <br />

      <PostFile :fileMessage="fileMsg"></PostFile>
    </div>
  </div>
  <PostHomeBoard></PostHomeBoard>
</template>

<script setup lang="ts">
import PostEditor from "@/components/post/PostEditor.vue";
import { ModalController } from "../../utilities/Modal/ModalController";
import MainButton from "@/components/utilities/MainButton.vue";
import Avatar from "@/components/utilities/Avatar.vue";
import { userDataStore } from "@/global/user_data";
import PostHomeBoard from "./PostHomeBoard.vue";
import PostFile from "./PostFile.vue";
import { ref } from "vue";

const modalController = new ModalController();

const fileMsg = ref<string[]>([
  "https://truth.bahamut.com.tw/s01/202503/forum/60076/338eedfd8cd48ce61653042e40264573.JPG",
  "http://$ip:$port/images/f01162b0-ee6a-11ef-b180-c10e9d08d6f6",
  "https://www.youtube.com/embed/nyq_S7N7Ygo",
  "https://stickershop.line-scdn.net/stickershop/v1/product/12679691/LINEStorePC/main.png",
  "https://www.youtube.com/embed/XiwY-syjwm4",
]);

///開啟文章發佈頁面
const goToEdit = () => {
  modalController.show(
    PostEditor,
    {},
    true,
    true,
    "rgba(0, 0, 0, 0.4)",
    "postedit"
  );
};

const changePage = (type: string) => {
  console.log(type);
};
</script>

<style scoped>
.mainbody {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

.postbody {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 650px;
}

.postTab {
  width: 90%;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.156);
  border-radius: 25px;
  margin: 15px 0px;
}

.postTabBtn {
  width: 50%;
  height: 100%;
  border-radius: 25px;
}

.postTabBtn:hover {
  background-color: rgb(66, 66, 66);
}

.postCreateContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px 50px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.156);
}

.postCreateBtn {
  flex-grow: 1;
  display: flex;
  margin-left: 15px;
}
</style>
