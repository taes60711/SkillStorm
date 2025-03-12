<template>
  <div class="postBody">
    <div class="postTab">
      <button @click="changePage(news)" class="postTabBtn">最新</button>
      <button @click="changePage()" class="postTabBtn">人氣</button>
    </div>

    Post Home
    <button @click="createModal">modalTest</button>
    <button @click="goToEdit">發文</button>
  </div>

  <div class="postBoadContainer">
    <div class="postBoard">
      <p class="postBoardTitle">看板</p>
      <div v-for="(item, index) in GlobalData.postBoard" v-bind:key="item.id">
        <p class="postBoardItem" @click="goToBoard">
          {{ `${item.chineseName}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TestModal from "../utilities/BaseModal/testModal.vue";
import { ModalController } from "../utilities/BaseModal/ModalController";
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import { GlobalData } from "@/global/global_data";

const createModal = () => {
  // 创建 Modal 并传递 props
  new ModalController().show(TestModal);
};

///跳至看板頁面
const goToBoard = () => {
  router.push(RouterPath.HOME.POST.BOARD);
};

///跳至文章編集頁面
const goToEdit = () => {
  router.push(RouterPath.HOME.POST.EDIT);
};

const changePage = (type: string) => {
  console.log(type);
};
</script>

<style scoped>
.postTab,
.postBoard {
  --height: 50px;
}

.postBody {
  width: 55vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.postTab {
  width: 50vw;
  max-width: 580px;
  height: var(--height);
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

.postBoadContainer {
  width: 250px;
}

.postBoard {
  background-color: rgb(41, 41, 42);
  margin-top: calc(var(--height) - 10px);
  padding: 10px;
  border-radius: 15px;
  border: 0.2px solid rgba(255, 255, 255, 0.134);
}

.postBoardTitle {
  font-size: 20px;
  font-weight: 800;
  padding-left: 10px;
  padding-bottom: 5px;
}

.postBoardItem {
  padding: 5px 10px 5px 10px;
  margin: 2px 0 2px 0;
  border-radius: 8px;
  cursor: pointer;
}

.postBoardItem:hover {
  background-color: rgb(35, 35, 36);
}
</style>
