<template>
  <BaseView :apiFunc="getNumbers" @apiReturnData="handleApiReturnData">
    <template #midbody>
      <div class="postbody">
        <div class="postTab">
          <button
            @click="() => viewModel.changeHomePage('new')"
            :class="{
              choicePostTabBtn: viewModel.nowHomePage.value === 'new',
              postTabBtn: viewModel.nowHomePage.value !== 'new',
            }"
          >
            最新
          </button>
          <button
            @click="() => viewModel.changeHomePage('popular')"
            :class="{
              choicePostTabBtn: viewModel.nowHomePage.value === 'popular',
              postTabBtn: viewModel.nowHomePage.value !== 'popular',
            }"
          >
            人氣
          </button>
        </div>

        <div class="postCreateContainer">
          <Avatar
            :imgurl="userDataStore.userData.value.image"
            size="40px"
            borderRadius="50px"
          />
          <MainButton
            :onPress="() => viewModel.createEditPage()"
            text="發佈新文章"
            class="postCreateBtn"
          ></MainButton>
        </div>

        <div v-for="(item, index) in numbers">
          <p class="sssw">
            {{ item }}
            <PostFile :fileMessage="fileMsg"></PostFile>
            {{ item }}
          </p>
        </div>
      </div>
    </template>

    <template #rightbody>
      <PostHomeBoard></PostHomeBoard>
    </template>
  </BaseView>
</template>

<script setup lang="ts">
import MainButton from "@/components/utilities/MainButton.vue";
import Avatar from "@/components/utilities/Avatar.vue";
import { userDataStore } from "@/global/user_data";
import PostHomeBoard from "./PostHomeBoard.vue";
import PostFile from "./PostFile.vue";
import { ref } from "vue";
import PostHomeViewModel from "@/view_models/post/post_home_view_model";
import BaseView from "@/components/utilities/BaseView.vue";

const viewModel = new PostHomeViewModel();

const fileMsg = ref<string[]>([
  "https://secretms.com/library/img/mob/_8190003.png",
  "http://$ip:$port/images/f01162b0-ee6a-11ef-b180-c10e9d08d6f6",
  "https://www.youtube.com/embed/nyq_S7N7Ygo",
  "https://stickershop.line-scdn.net/stickershop/v1/product/12679691/LINEStorePC/main.png",
  "https://www.youtube.com/embed/XiwY-syjwm4",
]);

const numbers = ref<number[]>([]);

function handleApiReturnData(data: number[]) {
  numbers.value.push(...data);
}

async function getNumbers(
  page: number = 0,
  size: number = 5
): Promise<number[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const numbers: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const start = page * size;
  const end = start + size;

  return numbers.slice(start, end);
}
</script>

<style scoped>
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

.postTabBtn,
.choicePostTabBtn {
  width: 50%;
  height: 100%;
  border-radius: 25px;
}

.choicePostTabBtn {
  background-color: rgb(66, 66, 66);
}

.postTabBtn:hover {
  background-color: rgb(23, 23, 23);
}

.postCreateContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px 50px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.156);
}

.sssw {
  width: 300px;
  background-color: rgb(47, 140, 140);
  margin-top: 10px;
}

.postCreateBtn {
  flex-grow: 1;
  display: flex;
  margin-left: 15px;
}
</style>
