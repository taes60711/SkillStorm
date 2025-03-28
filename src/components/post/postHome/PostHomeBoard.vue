<template>
  <div class="postBoadContainer">
    <div class="postBoard">
      <p class="postBoardTitle">看板</p>
      <div v-for="(item, index) in GlobalData.postBoard" v-bind:key="item.id">
        <p class="postBoardItem" @click="() => goToBoard(item.type)">
          <IconText :icon="item.iconData" :text="item.chineseName"></IconText>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router/router_manager";
import { RouterPath } from "@/router/router_path";
import { GlobalData } from "@/global/global_data";
import IconText from "@/components/utilities/IconText.vue";

///跳至看板頁面
const goToBoard = (type: number) => {
  router.push({
    name: RouterPath.HOME.POST.BOARD.name,
    params: {
      boardtype: type,
    },
  });
};
</script>

<style scoped>
.postBoadContainer {
  width: 250px;
  margin-right: 120px;
}

.postBoard {
  background-color: rgb(41, 41, 42);
  margin-top: 40px;
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

@media screen and (max-width: 1160px) {
  .postBoadContainer,
  .postBoard {
    display: none;
  }
}
</style>
